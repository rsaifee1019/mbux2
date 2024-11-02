import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({

  title: { type: String, required: true }, 
  category: { type: String, required: false },
  image: { type: String, required: false }, // Image of the post (optional)
  description: { type: String, required: false }, // Description of the post (optional)
  link: { type: String, required: false }, // Link to the file (e.g., Word, PDF, etc.)
  dateUploaded: { type: Date, required: true, default: Date.now }, // Date the post was uploaded
});

// Export the model
export default mongoose.models.Post || mongoose.model('Post', PostSchema);
