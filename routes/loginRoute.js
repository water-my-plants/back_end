const db = require('../config/dbConfig');
const bcrypt = require('bcryptjs');
const express = require('express');
const generateToken = require('../auth/authenticate');


const router = express.Router();

router.get('/', (req, res) => {
  res.send('wheeeeeeeee!');
})

router.post('/', async (req, res) => {
  try {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({error: 'please provide a username and password'});
  }
  else {
    const user = await db('users').where({username}).first();
    if (!user || !bcrypt.compareSync(password, user.password)) {
      res.status(401).json({error: 'invalid username or password'});
    } else {
      const token = await generateToken(user);
      console.log(token);
      res.status(200).json({message: 'thank you for logging in', token: token})
    }
  }

  } catch(err) {
    res.status(500).json({error: `there was an error: ${err}`})
  }

})
module.exports = router;
