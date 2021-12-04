import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({
      success: false,
      message: 'Login first to access the resource'
    })

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(400).json({
        success: false,
        message: 'Verification Failed'
      })
      req.user = user;
      next()
    })
    
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message
    })
  }

}