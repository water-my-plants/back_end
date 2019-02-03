const db = require('./dbConfig');

exports.users = {
  getUser: username =>
    db('users')
      .where({ username })
      .first(),
  addUser: user => db('users').insert(user)
};

exports.plants = {
  getPlantById: id => db('plants').where({ id }).first(),
  deletePlantById: id =>
    db('plants')
      .where({ id })
      .delete(),
  updatePlant: (id, changes) =>
    db('plants')
      .where({ id })
  .update(changes),
  addPlant: (user_id, plant) => db('plants').insert({ user_id, ...plant })
};
