const express = require('express');
const loginRoute = require('../routes/loginRoute');
const middlewareConfig = require('../config/middlewareConfig');

const server = express();
middlewareConfig(server);

server.get('/', (req, res) => {
  res.send('sanity check');
});

server.use('/api/login', loginRoute);

module.exports = server;