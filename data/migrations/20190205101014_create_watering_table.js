exports.up = function(knex, Promise) {
  return knex.schema.createTable('watering', tbl => {
    tbl.increments();
    tbl
      .integer('plant_id')
      .references('id')
      .inTable('plants');
    tbl.datetime('watering_time');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('watering');
};
