import mongoose from 'mongoose';

const feeRecordSchema = new mongoose.Schema({
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    month: {
      type: Date,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },

    lateFine: {
      type: Number,
      default: 0
    },
    dueDate: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['PENDING', 'PAID', 'OVERDUE'],
      default: 'PENDING'
    },
    paymentHistory: [{
      amount: Number,
      paymentDate: Date,
      includesFine: Boolean
    }]
  }, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  });


  feeRecordSchema.virtual('totalDue').get(function() {
    return (this.amount + this.lateFine) - this.paidAmount;
  });

// Then add the methods right after the schema definition
// but before creating the model

// Method to check and update late fine
feeRecordSchema.methods.updateLateFine = function() {
    const today = new Date();
    const dueDate = new Date(this.dueDate);
    
    if (this.status !== 'PAID' && today > dueDate && this.lateFine === 0) {
      this.lateFine = 100; // 100 tk fine
      this.markModified('lateFine');
    }
  };
  

  
  // Finally, create and export the model
  const FeeRecord = mongoose.models.FeeRecord || mongoose.model('FeeRecord', feeRecordSchema);
  export default FeeRecord;