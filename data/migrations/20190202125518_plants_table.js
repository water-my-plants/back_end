exports.up = function(knex, Promise) {
  return knex.schema.createTable('plants', tbl => {
    tbl.increments();
    tbl.integer('user_id').notNullable();
    tbl.string('name').notNullable();
    tbl.string('characteristics');
    tbl.text('description');
    tbl.date('last_water');
    tbl.date('next_water');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('plants');
};
