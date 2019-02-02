exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("plants")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("plants").insert([
        {
          user_id: "1",
          name: "plant1",
          characteristics: "plastic",
          last_water: "2019-02-02",
          next_water: "2019-02-03"
        },
        {
          user_id: "1",
          name: "plant2",
          characteristics: "poisonous",
          last_water: "2019-02-03",
          next_water: "2019-02-04"
        },
        {
          user_id: "2",
          name: "plant3",
          characteristics: "pink",
          last_water: "2019-02-01",
          next_water: "2019-02-04"
        }
      ]);
    });
};
