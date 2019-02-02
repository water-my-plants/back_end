const bcrypt = require('bcryptjs');
const express = require('express');
const { users } = require('../data/dbHelpers');
const generateToken = require('../auth/authenticate');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('it is working!');
});

router.post('/', async (req, res) => {
  try {
    const creds = req.body;
    if (!creds.username || !creds.password || !creds.email) {
      res
        .status(400)
        .json({ error: 'please provide a username, password, and email' });
    } else {
      creds.password = bcrypt.hashSync(creds.password);
      // await db('users').insert(creds);
      await users.addUser(creds);
      const token = await generateToken(creds);
      res.status(201).json({ creds, token });
    }
  } catch (err) {
    res.status(500).json({ error: `oh no! ${err}` });
  }
});

module.exports = router;
