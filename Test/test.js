const mongoose = require('mongoose');
const database = require('../database/database.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server/server.js');

const should = chai.should();
chai.use(chaiHttp);

describe('/GET band', () => {
  it('Should return a band/artist with a bandId of 1', (done) => {
    chai.request(app)
      .get('/artistBio/1')
      .end((err, res) => {
        // console.log('Response: ', res);
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.bandId.should.be.a('number');
        res.body.bandId.should.be.equal(1);
        res.body.bandImageUrl.should.be.a('string');
        done();
      });
  });

  it('it should return an error if input bandId is 34', () => {
    chai.request(app)
      .get('/artistBio/34')
      .end((err, res) => {
        // console.log(res);
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.be.empty;
      });
  });
});