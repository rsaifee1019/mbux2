import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
    unique: false,
  },
  phone: {
    type: String,
    required: false,
  },
  studentId: {
    type: String,
    required: false,
    unique: false,
  },
  degree: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: false,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending',
  },
  personalDetailsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PersonalDetails',
    required: false,
  },
});

// Check if the model is already defined
const Student = mongoose.models.Student || mongoose.model('Student', StudentSchema);

export default Student;
