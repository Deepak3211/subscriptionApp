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


// PORT
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}


// Listen

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})