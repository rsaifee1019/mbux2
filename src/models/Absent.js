import mongoose from 'mongoose';

const AbsentSchema = new mongoose.Schema({
  studentId: {
    type: Array,
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
  
});

const Absent = mongoose.models.Absent || mongoose.model('Absent', AbsentSchema);

export default Absent;