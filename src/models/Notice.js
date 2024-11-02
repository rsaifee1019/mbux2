import mongoose from 'mongoose';

const NoticeSchema = new mongoose.Schema({

  title: { type: String, required: true }, // Title of the notice
  description: { type: String, required: false }, // Description of the notice (optional)
  link: { type: String, required: false }, // Link to the file (e.g., Word, PDF, etc.)
  dateUploaded: { type: Date, required: true, default: Date.now }, // Date the notice was uploaded
});

// Export the model
export default mongoose.models.Notice || mongoose.model('Notice', NoticeSchema);
