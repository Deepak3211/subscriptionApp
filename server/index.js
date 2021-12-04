import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db';
import userRouter from './routes/authRoutes';
import subscriptionRouter from './routes/subsRoutes';
// Initializing the server
const app = express();

// Middlewares
app.use(express.json({limit:'5mb'}));
app.use(cors({
  origin: [process.env.CLIENT_URL],
}));
app.use(cookieParser());


// Routes
// app.get('/api/v1/register', (req,res)=> {
//   res.json('hey there')
// })
app.use('/api/v1', userRouter);
app.use('/api/v1', subscriptionRouter);

// Database Connection
connectDB();


// PORT
const PORT = process.env.PORT || 5000;


// Listen

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})