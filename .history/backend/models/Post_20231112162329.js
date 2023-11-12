// Post.js

const mongoose = require('mongoose');

// Define the Post schema
const postSchema = new mongoose.Schema({
  title: {
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

// Create the Post model
const Post = mongoose.model('Post', postSchema);

// Export the model
module.exports = Post;
