const jwt = require('jsonwebtoken');
const { plants, users } = require('../data/dbHelpers');

module.exports = {
  protect: (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
          res.status(401).json({ message: 'Invalid token' });
        } else {
          req.decodedToken = decodedToken;
          next();
        }
      });
    } else {
      res
        .status(401)
        .json({ message: 'You are unauthorized! Please provide a token' });
    }
  },
  checkForValidUserId: async (req, res, next) => {
    try {
      const user = await users.getUserById(req.params.id);
      // user does not exist
      if (!user) {
        res.status(400).json({ error: 'there is no user with that id' });
      } else {
        next();
      }
    } catch (err) {
      console.log(err);
    }
  },
  checkUserAccess: async (req, res, next) => {
    try {
      if (`${req.decodedToken.userId}` !== req.params.id) {
        res
          .status(403)
          .json({
            error: 'you are not authorized to access that user profile'
          });
      } else {
        next();
      }
    } catch (err) {
      res.status(500).json({ error: `there was an error: ${err}` });
    }
  }
};
