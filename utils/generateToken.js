const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
};

module.exports = generateToken;
