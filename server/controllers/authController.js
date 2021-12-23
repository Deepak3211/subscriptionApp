import User from "../models/User";
import { hashPassword, comparePassword, createAccessToken } from "../utils/auth";
import sendToken from "../utils/jwtToken"
import jwt from 'jsonwebtoken'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


// Register User => /api/v1/register
export const registerUser = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) return res.status(400).json({ 
      success: false,
      message: 'Please fill all the details'
    })

    if (!password || password.length < 6) return res.status(400).json({
      success: false,
      message: 'Password must be at least 6 characters'
    })

    const userExists = await User.findOne({ email: email.toLowerCase() });

    if (userExists) return res.status(400).json({
      success: false,
      message: 'User already exists'
    })
    
    // Hashing the password
    const hashedPassword = await hashPassword(password);

    // Create account in stripe
    const customer = await stripe.customers.create({
      email: email.toLowerCase(),
    });
    // console.log(' customer account created with stripe on signup', customer)
    // register the user
    const user = await User.create({ name, email: email.toLowerCase(), password: hashedPassword , stripe_customer_id:customer.id});
    
  
    sendToken(user, 201, res);

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// Login User => /api/v1/Login

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password')
    

    if (!user) return res.status(400).json({
      success: false,
      message: 'User not found'
    })
    
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(400).json({
      success: false,
      message: 'Invalid email or password'
    })

    sendToken(user, 200, res);

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


// Logout User => /api/v1/logout

export const logoutUser = (req, res) => {
  try {
    res.clearCookie('refreshToken', {
      path: '/api/v1/refresh_token',
      expires: new Date(Date.now())
      
    })
    return res.status(200).json({success:true, message:'Successfully logout'})
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// Get User Information => /api/v1/getUserInfo

export const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({
      success: false,
      message: 'User does not exist'
    })
    res.json(user)
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}



// Get accessToken => /api/v1/refresh_token


export const getAccessToken = (req, res) => {

  try {
    const rf_token = req.cookies.refreshToken;
    if (!rf_token) return res.status(400).json({
      success: false,
      message: 'Please login again'
    })
    jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(400).json({
        success: false,
        message: 'Verification failed'
      })
      const accessToken = createAccessToken ({id: user.id})
      res.status(200).json({success:true, accessToken})
    })
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    
    })
    
  }
}