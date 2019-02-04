const bcrypt = require('bcryptjs');
const express = require('express');
const { users } = require('../data/dbHelpers');
const generateToken = require('../auth/authenticate');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('wheeeeeeeee!');
});

router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ error: 'please provide a username and password' });
    } else {
      const user = await users.getUser(username);
      console.log(user);
      
      if (!user || !bcrypt.compareSync(password, user.password)) {
        res.status(401).json({ error: 'invalid username or password' });
      } else {
        const token = await generateToken(user);
        delete user.password;
        // better to send user seperately?
        res
          .status(200)
          .json({ user, token });
      }
    }
  } catch (err) {
    res.status(500).json({ error: `there was an error: ${err}` });
  }
});
module.exports = router;
