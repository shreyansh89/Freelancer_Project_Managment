const jwt = require('jsonwebtoken');
const User = require('../models/user');

const signToken = (id) => jwt.sign({ id }, 'your_jwt_secret', { expiresIn: '1m' });

module.exports.signup = async (req, res) => {
  // console.log(req.body);
  const newUser = await User.create(req.body);
  const token = signToken(newUser._id);
  res.status(201).json({ status: 'success', token });
};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).select('+password');
  
  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }
  
  const token = signToken(user._id);
  res.status(200).json({ status: 'success', token });
};
