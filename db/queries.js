const knex = require('./knex.js');

const selectTable = function() {
  return knex('examplepassages');
}

const allPassages = function() {
  return selectTable().select();
}

const addPassage = function(passage) {
  return selectTable().insert({passage:passage});
}

module.exports = {
  allPassages,
  addPassage
}