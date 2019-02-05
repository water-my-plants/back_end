// Update with your config settings.
require('dotenv').config();
const pg = require('pg');

pg.defaults.ssl = process.env.DB_ENV === 'production';

module.exports = {
  development: {
    // database: './data/db',
    // user: 'username',
    // password: 'password'
    client: 'pg',
    // connection: process.env.DATABASE_URL,
    connection: {
      host: '127.0.0.1',
      user: 'justin',
      password: 'password',
      database: 'testdb'
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  }
};
