import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './server/config/db';
import userRouter from './server/routes/authRoutes';
import subscriptionRouter from './server/routes/subsRoutes';
const path = require('path')

// Initializing the server
const app = express();

// Middlewares
app.use(express.json({limit:'5mb'}));
app.use(cors());
app.use(cookieParser());


// Routes
// app.get('/api/v1/register', (req,res)=> {
//   res.json('hey there')
// })
app.use('/api/v1', userRouter);
app.use('/api/v1', subscriptionRouter);

// Database Connection
connectDB();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './client/build')));
  
  app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname,'./client/build','index.html'));
  })
}

// PORT
const PORT = process.env.PORT || 5000;

// Listen

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})