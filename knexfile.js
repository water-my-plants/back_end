// Update with your config settings.
require('dotenv').config();
const pg = require('pg');

pg.defaults.ssl = true;

module.exports = {
  development: {
    // user: 'username',
    // password: 'password',
    client: 'sqlite3',
    connection: {
      filename: './data/db.sqlite3'
    },
    useNullAsDefault: true,
    // connection: './data/waterdb',
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
      tableName: 'knex_migrations'
    }
  }
};
