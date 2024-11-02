import mongoose from 'mongoose';

const StaffSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
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
  imageUrl: { type: String }
});

export default mongoose.models.Staff || mongoose.model('Staff', StaffSchema);
