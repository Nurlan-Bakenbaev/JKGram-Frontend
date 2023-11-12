
import mongoose from 'mongoose';
const postSchema = new mongoose.Schema({
  title: {
    user
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const Post = mongoose.model('Post', postSchema);


module.exports = Post;
