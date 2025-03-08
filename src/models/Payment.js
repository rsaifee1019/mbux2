import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: false,
  },
  paymentDate: {
    type: Date,
    required: false,
    default: Date.now,
  },
  paymentType: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
    required: true,
  },
  userType: {
    type: String,
    enum: ['applicant', 'student'],
    required: false,
  },
  transactionId: {
    type: String,
    required: false,
  },
  applicantId: {
    type: String,
    required: false,
    ref: 'Applicants',
  },
  studentId: {
    type: String,
    required: false,
    ref: 'Students',
  },
  paymentType: {
    type: String,
    required: false,
  },
});

// Check if the model is already defined
const Payment = mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);

export default Payment;






