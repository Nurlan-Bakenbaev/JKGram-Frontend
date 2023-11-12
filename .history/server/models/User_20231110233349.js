import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 2,
    max: 15,
  },
  lastName: {
    type: String,
    required: true,
    min: 2,
    max: 15,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    min: 2,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    unique: true,
    min: 6,
    max: 50,
  },
  picturePath: {
    type: String,
    default: "",
  },
  friends: {
    type: Array,
    default: [],
  },
  location:String,
  location:String,

});
