require('dotenv').config();
const knex = require('knex');
const knexConfig = require('../knexfile');

const dbEnv = process.env.DB_ENV || 'production';
console.log(dbEnv);

module.exports = knex(knexConfig[dbEnv]);
