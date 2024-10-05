import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  
  Name:{
    type: String,
    required: [true, "Please fill the Name"]
  },
  Email:{
    type: String,
    required: [true, "Please add the User email address"],
    unique: [true, "Email address already taken"]
  },
  Phone:{
    type: String,
    required: [true, "Please fill the Phone Number"]
  },
  Password:{
    type: String,
    required: [true, "Please fill the Password"]
  }
  
},{
timestamps: true,
});

const User = mongoose.model('User', userSchema);


export default User;
