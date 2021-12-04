import mongoose  from "mongoose";
const { Schema } = mongoose;
import validator from "validator";


const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: [50, 'Your name can\'t exceed 50 characters'],
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: [validator.isEmail,'Please enter a valid email address']
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 64,
    select: false
  },
}, { timestamps: true });

export default mongoose.model('User', userSchema);