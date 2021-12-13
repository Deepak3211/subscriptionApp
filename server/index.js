import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db';
import userRouter from './routes/authRoutes';
import subscriptionRouter from './routes/subsRoutes';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname,'../client/build','index.html'));
  })
}

// Listen

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})