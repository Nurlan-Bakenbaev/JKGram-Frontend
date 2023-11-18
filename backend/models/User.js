import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 15,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 15,
    },
    email: {
      type: String,
      unique: true,
      maxlength: 60,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 120,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);
export default User;
