// models/password.js
import mongoose from 'mongoose';

const passwordSchema = new mongoose.Schema({
  websiteName: { type: String, required: true },
  websiteUrl: { type: String, required: true },
  password: { type: String, required: true },
 
});

const Password = mongoose.model('Password', passwordSchema);

export default Password;
