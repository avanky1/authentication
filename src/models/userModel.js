import { verify } from "crypto";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
     email: {
          type: String,
          required: [true, " Please enter the email"],
          unique: true,
     },
     password: {
          type: String,
          required: [true, "Please enter the password"],
     },
     username: {
          type: String, 
          required:  [true, "Please enter the username"],
          unique:true,
     },
     isVerified: {
          type: Boolean,
          default: false,
     },
     isAdmin: {
          type: Boolean,
          default: false,
     },
     forgotPasswordToken: String,
     forgotPasswordTokenExpires: Date,
     verifyToken: String,
     verifyTokenExpires: Date,

});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;