import mongoose from 'mongoose';

const FeeSchema = new mongoose.Schema({
  degree: {
    type: String,     // Description of the fee (optional)
    required: true,
  },
  year: {
    type: String,     // Description of the fee (optional)
    required: true,
  },
  division: {
    type: String,
    required: false,
  },
  type: {
    type: String,   // Type of fee (e.g., 'registration', 'tuition', 'sports', etc.)
    required: true,
  },
  subtype: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,    // Fee amount
    required: true,
  },
 
  
  
});

const Fee = mongoose.models.Fee || mongoose.model('Fee', FeeSchema);

export default Fee;





