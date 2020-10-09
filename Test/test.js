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
        // console.log('Response: ', res.body);
        res.should.have.status(200);
        res.body.data.should.be.an('object');
        res.body.data.bandId.should.be.a('number');
        res.body.data.bandId.should.be.equal(1);
        res.body.data.bandImageUrl.should.be.a('string');
        res.body.data.bandName.should.be.a('string');
        res.body.data.bandName.should.be.equal('Down Home Agita');
        done();
      });
  });

  it('it should return an error if input bandId is 34', () => {
    chai.request(app)
      .get('/artistBio/34')
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(400);
        res.body.msg.should.be.a('string');
        res.body.msg.should.be.equal('there is no band with id 34');

      });
  });
});