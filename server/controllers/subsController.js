const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const getPrice = async (req, res) => {
  try {
    
  const prices = await stripe.prices.list();
  // console.log(prices.data)
  
  res.status(200).json(prices.data.reverse());
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch the data'
    })
  }
}