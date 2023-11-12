import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
    min: 2,
    max: 15,
  },
  lastName: {
    type: String,
    require: true,
    min: 2,
    max: 15,
  },
});
