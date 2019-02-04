// Update with your config settings.
require('dotenv').config();
const pg = require('pg');

pg.defaults.ssl = true;

module.exports = {
  development: {
    // database: './data/db',
    // user: 'username',
    // password: 'password'
    client: 'pg',
    connection:
      'postgres://oarbocgruedasc:0e774ddedd79887e7db7554dda8ccf1c22ec2791b04ceb20a6ded123c72b9f77@ec2-174-129-224-157.compute-1.amazonaws.com:5432/d3l9p5upddbh17',
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
