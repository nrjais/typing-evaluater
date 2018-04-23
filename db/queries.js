const knex = require('./knex.js');

const selectTable = function() {
  return knex('examplepassages');
}

const allPassages = function() {
  return selectTable().select();
}

module.exports = {
  allPassages
}