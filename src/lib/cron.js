import mongoose from 'mongoose';
import FeeRecord from '@/models/FeeRecord';
import Student from '@/models/Student';
import dotenv from 'dotenv';
import connectionToDatabase from '@/lib/mongodb';
import Fee from '@/models/Fee';

dotenv.config();

export async function generateMonthlyFeeRecords() {
  // Ensure database connection
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Get all active students
    const students = await Student.find().session(session);

    // Get the current month and year
    const currentDate = new Date();
    const month = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    // Calculate due date (e.g., 15th of the current month)
    const dueDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 15);

    const feeRecordsToCreate = [];

        // Check each student individually
        for (const student of students) {
            // Find the latest fee record for this student
            const existingFeeRecords = await FeeRecord.find({
              student: student._id,
              month: {
                $gte: month // Check for any records from current month onwards
              }
            })
            .sort({ month: 1 }) // Sort by month ascending
            .session(session);
      


            if (existingFeeRecords.length === 0) {

                const fee = await Fee.findOne({ degree: student.degree, subtype: 'tuition' });
                // No advance payments exist, create new record
                feeRecordsToCreate.push({
                  student: student._id,
                  month: month,
                  amount: fee.amount,
                  dueDate: dueDate,
                  status: 'PENDING',
                  paymentHistory: []
                });
              } else {
                // Check the latest month covered by advance payments
                const lastPaidMonth = new Date(existingFeeRecords[existingFeeRecords.length - 1].month);
                const currentMonth = new Date(month);
                const fee = await Fee.findOne({ degree: student.degree, subtype: 'tuition' });
        
                if (lastPaidMonth.getTime() < currentMonth.getTime()) {
                  // If the last paid month is before current month, create new record
                  feeRecordsToCreate.push({
                    student: student._id,
                    month: month,
                    amount: fee.amount,
                    dueDate: dueDate,
                    status: 'PENDING',
                    paymentHistory: []
                  });
                } else {
                  console.log(`Skipping fee record for student ${student._id} - advance payment exists`);
                }
            }
        }

    const existingRecords = await FeeRecord.countDocuments({
      month: {
        $gte: month,
        $lt: new Date(month.getFullYear(), month.getMonth() + 1, 1)
      }
    }).session(session);

    if (existingRecords > 0) {
      console.log('Fee records already generated for this month');
      await session.abortTransaction();
      session.endSession();
     return;
         }

         if (feeRecordsToCreate.length > 0) {
            const createdRecords = await FeeRecord.insertMany(feeRecordsToCreate, { session });
            console.log(`Generated ${createdRecords.length} fee records for ${month.toLocaleString('default', { month: 'long' })} ${month.getFullYear()}`);
          } else {
            console.log('No new fee records needed to be generated');
          }
      
          await session.commitTransaction();
          session.endSession();
          
          return feeRecordsToCreate;
        } catch (error) {
          await session.abortTransaction();
          session.endSession();
          console.error('Error generating monthly fee records:', error);
          throw error;
        }
      }
      

export async function updateOverdueFees() {
  // Ensure database connection
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGODB_URI);
  }

  try {
    // Find all pending fee records past their due date
    const overdueRecords = await FeeRecord.find({
      status: 'PENDING',
      dueDate: { $lt: new Date() }
    });

    // Update status and apply late fee
    for (const record of overdueRecords) {
      record.status = 'OVERDUE';
      record.lateFine += 100; // Add late fee
      await record.save();
    }

    console.log(`Updated ${overdueRecords.length} overdue fee records`);
  } catch (error) {
    console.error('Error updating overdue fees:', error);
  }
}