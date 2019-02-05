const bcrypt = require('bcryptjs');

const pw = bcrypt.hashSync('pass');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'justin',
          email: 'justin@jisdf',
          password: pw,
          phone: '123456789'
        },
        {
          username: 'lidiia',
          email: 'lidiia@jifosd',
          password: pw,
          phone: '0987461'
        },
        {
          username: 'test1',
          email: 'lidiia@jifsd',
          password: pw,
          phone: '13701475'
        },
        {
          username: 'test2',
          email: 'lidiia@jifd',
          password: pw,
          phone: '1728935'
        },
        {
          username: 'testuser4',
          email: 'jfiosjfd@fjdios',
          password: pw,
          phone: '1273591'
        }
      ]);
    });
};
