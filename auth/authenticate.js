require('dotenv').config();
const jwt = require('jsonwebtoken');

function generateToken(user) {
  const payload = {
    username: user.username,
    userId: user.id
  };

  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: '60m'
  };

  return jwt.sign(payload, secret, options);
}

module.exports = generateToken;
