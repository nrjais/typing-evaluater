const chai = require('chai');
const should = chai.should();
const path = require('path');
// const knex = require(path.resolve('db/knex.js'));
const Queries = require(path.resolve('db/queries.js'));
const environment = 'test';
const config = require('../knexfile.js')[environment];

describe('Queries',function(){
  const queries = new Queries(config);
  after(function(done){
    queries.endConnection();
    done();
  });
  beforeEach(function(done){
    queries.restoreInitialState(done);
  });

  afterEach(function(done) {
    queries.rollBack(done);
  });

  describe('allPassage',function(){
    it('should give all passages available in the database',function(done){
        queries.allPassages().
        then(function(table){
          table.should.be.a('array');
          table[0].should.have.property('passage');
          table[0].passage.should.equal('rowValue1');
          table[1].should.have.property('passage');
          table[1].passage.should.equal('rowValue2');
          table[2].should.have.property('passage');
          table[2].passage.should.equal('rowValue3');
          chai.assert.equal(table.length,3);
          done()
        }).catch(function(err){
          done(err);
        });
    });
  });
  describe('addPassage',function(){
    it('should add a given passage in database',function(done){
      let testPassage = 'this is a passage for test';
      queries.addPassage(testPassage)
      .then(function(){
        queries.allPassages()
        .then(function(table){
          table.should.be.a('array');
          table.length.should.equal(4);
          table[3].passage.should.equal(testPassage);
          done();
        }).catch(function(err){
          done(err);
        });
      }).catch(function(){
        done(err);
      });
    });
  });
});