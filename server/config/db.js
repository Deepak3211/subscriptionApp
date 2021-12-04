import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const db = process.env.DATABASE_URI;

export const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log('Database connection established');
    
  } catch (error) {
    console.log(error.message);
  }
}