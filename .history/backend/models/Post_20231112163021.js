import mongoose from "mongoose";
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
    type: String,
    required: true,
  },
location: String,
  description:String,
  picturePath: String,
  userPicture:
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
