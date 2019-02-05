exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('watering')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('watering').insert([
        { plant_id: 1, watering_time: '2019-02-05 8:00' },
        { plant_id: 2, watering_time: '2019-02-05 13:00' },
        { plant_id: 1, watering_time: '2019-02-06 8:00' },
        { plant_id: 3, watering_time: '2019-02-05 8:00' },
        { plant_id: 1, watering_time: '2019-02-07 8:00' }
      ]);
    });
};
