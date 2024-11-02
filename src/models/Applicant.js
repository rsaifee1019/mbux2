// models/Applicant.js
import mongoose from 'mongoose';

const ApplicantSchema = new mongoose.Schema({
  ssc_registration: {
    type: String,
    required: true,
    unique: true // Primary key in Sequelize becomes unique in Mongoose
  },
  name_English: {
    type: String,
    required: false
  },
  application_date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['unpaid', 'pending', 'accepted', 'rejected'],
    default: 'unpaid'
  },
  phone: {
    type: String,
    required: false
  },
  personalDetailsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PersonalDetails', // Reference to the PersonalDetails model
    required: false
  }
});

// Export the model
export default mongoose.models.Applicant || mongoose.model('Applicant', ApplicantSchema);
