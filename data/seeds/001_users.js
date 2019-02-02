
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'justin', email: 'justin@jisdf', password: 'pass'},
        { username: 'lidiia', email: 'lidiia@jifosd', password: 'pass'},
        { username: 'test1', email: 'lidiia@jifosd', password: 'pass'},
        { username: 'test2', email: 'lidiia@jifosd', password: 'pass'},
        { username: 'testuser4', email: 'jfiosjfd@fjdios', password: 'pass'},
      ]);
    });
};
