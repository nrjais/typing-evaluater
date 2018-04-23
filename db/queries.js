// const environment = process.env.NODE_ENV || 'development';
// const config = require('../knexfile.js')[environment];
// const knex = require('knex')(config);


class Queries {
  constructor(config) {
    this.knex = require('knex')(config);
  }

  selectTable(){
    return this.knex('examplepassages');
  }

  allPassages(){
    return this.selectTable().select();
  }

  addPassage(passage){
    return this.selectTable().insert({passage});
  }

  endConnection(){
    this.knex.destroy();
  }

  getKnex(){
    return this.knex;
  }

  rollBack(callBack){
    this.knex.migrate.rollback()
    .then(function() {
      callBack();
    });
  }

  restoreInitialState(callBack){
    let knex = this.knex;
    knex.migrate.rollback()
    .then(function() {
      knex.migrate.latest()
      .then(function() {
        return knex.seed.run()
        .then(function() {
          callBack();
        });
      });
    });
  }
}

module.exports = Queries;