
import mongoose from 'mongoose';
const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  fistName: {
    type: String,
    required: true,
  },
  lastName: {
   type:St
  },
});


const Post = mongoose.model('Post', postSchema);


module.exports = Post;