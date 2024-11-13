import mongoose from 'mongoose';

const TeacherSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userEmail: { type: String },

  title: { type: String, required: true },
  publicationDate: { type: Date },
  nationalId: { type: String },
  gender: { type: String},
  religion: { type: String },
  bloodGroup: { type: String },
  mobileNo: { type: String },
  email: { type: String },
  designation: { type: String },
  educationQualifications: { type: String },
  educationBackground: { type: String },
  presentAddress: { type: String },
  permanentAddress: { type: String },
  maritalStatus: { type: String },
  fathersName: { type: String },
  mothersName: { type: String },
  imageUrl: { type: String },
  status: { type: String }
});

export default mongoose.models.Teacher3 || mongoose.model('Teacher3', TeacherSchema);
