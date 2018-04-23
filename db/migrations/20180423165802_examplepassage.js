
exports.up = function(knex, Promise) {
  return knex.schema.createTable('examplepassages',function(table){
    table.increments('id');
    table.text('passage');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('examplepassages');
};
