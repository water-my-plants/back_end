const bcrypt = require('bcryptjs');
const express = require('express');
const { users } = require('../data/dbHelpers');
const generateToken = require('../auth/authenticate');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const creds = req.body;
    if (!creds.username || !creds.password || !creds.email || !creds.phone) {
      res.status(400).json({
        error: 'please provide a username, password, email, and phone number'
      });
    } else {
      creds.password = bcrypt.hashSync(creds.password);
      await users.addUser(creds);
      delete creds.password;
      res.status(201).json(creds);
    }
  } catch (err) {
    res.status(500).json({ error: `oh no! ${err}` });
  }
});

module.exports = router;
