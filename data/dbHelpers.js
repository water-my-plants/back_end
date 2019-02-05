const db = require('./dbConfig');

exports.users = {
  getUsers: () => db('users').select('username', 'img_url'),
  getUser: username =>
    db('users')
      .where({ username })
      .first(),
  getUserById: id =>
    db('users')
      .where({ id })
      .first(),
  addUser: user => db('users').insert(user),
  updateUser: (id, changes) =>
    db('users')
      .where({ id })
      .update(changes)
};

exports.plants = {
  getAllPlants: () =>
    db('plants').select('name', 'description', 'characteristics'),
  getUserPlants: user_id => db('plants').where({ user_id }),
  getPlantById: id =>
    db('plants as p')
      .where({ id })
      .first(),
  getWateringSchedule: plant_id =>
    db('watering')
      .where({ plant_id })
      .select('watering_time'),
  deletePlantById: id =>
    db('plants')
      .where({ id })
      .delete(),
  updatePlant: (id, changes) =>
    db('plants')
      .where({ id })
      .update(changes),
  addPlant: (user_id, plant) =>
    db('plants').insert({ user_id, ...plant }, 'id'),
  addWatering: (plant_id, watering_time) =>
    db('watering').insert({ plant_id, watering_time })
};
