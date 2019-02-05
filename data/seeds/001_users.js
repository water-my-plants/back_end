const bcrypt = require('bcryptjs');
const faker = require('faker');

const pw = bcrypt.hashSync('pass');

const seeds = [
  {
    username: 'justin',
    email: 'justin@jisdf',
    password: pw,
    phone: '123456789'
  }
];
for (let i = 0; i < 100; i++) {
  seeds.push({
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: pw,
    phone: faker.phone.phoneNumber('+1##########')
  });
}

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([...seeds]);
    });
};
