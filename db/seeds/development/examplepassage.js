
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('examplepassages').del()
    .then(function () {
      // Inserts seed entries
      return knex('examplepassages').insert([
        {passage: 'rowValue1'},
        {passage: 'rowValue2'},
        {passage: 'rowValue3'}
      ]);
    });
};
