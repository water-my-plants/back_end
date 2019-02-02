const express = require('express');
const loginRoute = require('../routes/loginRoute');
const registerRoute = require('../routes/registerRoute');
const middlewareConfig = require('../config/middlewareConfig');

const server = express();
middlewareConfig(server);

server.get('/', (req, res) => {
  res.send('sanity check');
});

server.use('/api/login', loginRoute);
server.use('/api/register', registerRoute);

module.exports = server;