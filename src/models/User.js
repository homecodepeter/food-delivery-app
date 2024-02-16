import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  role: {
    type: String,
    required: true,
    unique: true,
  }
},
 { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User; 
