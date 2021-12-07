import User from "../models/User";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const getPrice = async (req, res) => {
  try {
    
  const prices = await stripe.prices.list();
  // console.log(prices.data)
  
  res.status(200).json(prices.data.reverse());
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const createSubscription = async (req, res)=> {
// console.log(req.body);

  try {
    const { priceID } = req.body;
  const user = await User.findById(req.user.id)
    // console.log(user);

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ 
        price: priceID,
        quantity:1
      }],
      customer: user.stripe_customer_id,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,

    })
    // console.log('checkout session', session);
    res.status(201).json(session.url);
} catch (error) {
  res.status(500).json({
    success: false,
    message: error.message
  })
}
}