const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  if (!token) return res.status(401).json({ message: 'Not authorized, no token' });
  
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = await User.findById(decoded.id).select('+password');
    if (!req.user) throw new Error();
    next();
  } catch (err) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};
