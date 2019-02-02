const express = require('express');
const loginRoute = require('../routes/loginRoute');
const registerRoute = require('../routes/registerRoute');
const plantsRoute = require('../routes/plantsRoute');
const usersRoute = require('../routes/usersRoute');

const middlewareConfig = require('../config/middlewareConfig');

const server = express();
middlewareConfig(server);

server.get('/', (req, res) => {
  res.send('sanity check');
});

server.use('/api/login', loginRoute);
server.use('/api/register', registerRoute);
// server.use('/api/user/:id/plants', plantsRoute);
server.use('/api/users', usersRoute);
server.use('/api/plants', plantsRoute)

module.exports = server;
