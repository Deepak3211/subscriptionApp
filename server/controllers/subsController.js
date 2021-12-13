import User from "../models/User";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// getPrice => /api/v1/getPrice
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


//Create Subcription => /api/v1/create-subscription
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

// Subscription Status => /api/v1/subscription-status

export const getSubscriptionStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    const subscriptions = await stripe.subscriptions.list({
      customer: user.stripe_customer_id,
      status: 'all',
      expand: ['data.default_payment_method']
    })
    // console.log(user.id)
    const updated = await User.findByIdAndUpdate(user.id, {
      subscriptionPlan: subscriptions.data
    },{new:true})
    // console.log(updated)
    res.status(200).json(updated)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


// Get Subscriptions => /api/v1/subscription

export const getSubscriptions = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const subscriptions = await stripe.subscriptions.list({
      customer: user.stripe_customer_id,
      status: 'all',
      expand: ['data.default_payment_method']
    })

    res.status(200).json(subscriptions)

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


// customer dashboard => /api/v1/customer-dashboard

export const customerPortal = async (req, res) => {

  try {
    const user = await User.findById(req.user.id);

    const session = await stripe.billingPortal.sessions.create({
  customer: user.stripe_customer_id,
  return_url: process.env.STRIPE_SUCCESS_URL,
});
    res.status(200).json(session.url)
    // console.log(session);

    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}