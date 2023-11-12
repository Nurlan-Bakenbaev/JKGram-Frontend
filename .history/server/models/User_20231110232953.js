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
    unique:true,
    min: 2,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    unique:true,
    min: 2,
    max: 50,
  },
});
