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
  getAllPlants: () => db('plants').select('name', 'description', 'location'),
  getUserPlants: user_id => db('plants').where({ user_id }),
  getPlantById: id =>
    db('plants as p')
      .where({ id })
      .first(),
  getWateringSchedule: plant_id =>
    db('watering')
      .where({ plant_id })
      .select('id', 'watering_time'),
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
    db('watering').insert({ plant_id, watering_time }, 'id'),
  deleteWateringSchedule: plant_id =>
    db('watering')
      .where({ plant_id })
      .delete(),
  deleteWateringTime: id =>
    db('watering')
      .where({ id })
      .delete()
};

exports.notifications = {
  // every time we add a watering, get time, plant name, user name, user phone for notification
  addNotification: wateringId =>
    db('watering as w')
      .join('plants as p', 'w.plant_id', 'p.id')
      .join('users as u', 'p.user_id', 'u.id')
      .where({ 'w.id': wateringId })
      .select('u.username', 'p.name as plant', 'u.phone', 'w.watering_time')
};
