import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    role: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: false },
    studentId: { type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: false },
    phone: { type: String, required: false },
    password: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
