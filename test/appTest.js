const chai = require('chai');
const assert = chai.assert;
const request = require('supertest');
const path = require('path');
const app = require(path.resolve('app.js'));

describe('App',function(){
  describe('GET /',function(){
    it('should give index.html page',function(done){
      request(app)
      .get('/')
      .expect(200)
      .expect('content-type',/text\/html/)
      .end(done);
    })
  });
  describe('GET /text',function(){
    it('should give passage text',function(done){
      request(app)
      .get('/text')
      .expect(200)
      .expect('content-type',/text\/javascript/)
      .expect(/var text/)
      .end(done);
    });
  });
  describe('POST /addText',function(){
    it('should add give passage in all passage',function(done){
      request(app)
      .post('/addText')
      .send('test=some testing text')
      .expect(302)
      .expect('Location','/index.html')
      .end(done);
    });
  });
});