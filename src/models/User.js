import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    role: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String, required: false },
    studentId: { type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: false },
    phone: { type: String, required: false },
    password: { type: String, required: true },
});

// Hash password before saving
// UserSchema.pre('save', async function(next) {
//     if (!this.isModified('password')) return next();
    
//     try {
//       const salt = await bcrypt.genSalt(10);
//       this.password = await bcrypt.hash(this.password, salt);
//       next();
//     } catch (error) {
//       next(error);
//     }
//   });
  
  // Method to compare passwords
  UserSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
