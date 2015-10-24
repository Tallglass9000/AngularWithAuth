var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
process.env.MONGO_URL = 'mongodb://localhost/beverages_test';
require(__dirname + '/../server.js');
var mongoose = require('mongoose');
var url = 'localhost:3000/api';
var Beverage = require(__dirname + '/../models/beverage');
var User = require(__dirname + '/../models/user');

describe('the beverages resource', function () {
  after(function (done) {
    mongoose.connection.db.dropDatabase(function (err) {
      if (err) throw err;
      done();
    });
  });

  before (function (done) {
    var user = new User();
    user.username = 'test';
    user.basic.username = 'test';
    user.generateHash('foobar123', function (err, res) {
      if (err) throw err;
      user.save(function (err, data) {
        if (err) throw err;
        user.generateToken(function (err, token) {
          if (err) throw err;
          this.token = token;
          done();
        }.bind(this));
      }.bind(this));
    }.bind(this));
  });

  it('should be able to get beverages', function (done) {
    chai.request(url)
      .get('/beverages')
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  it('should be able to create a beverage', function (done) {
    chai.request(url)
      .post('/beverages')
      .send({beverageBody: 'test beverage', token: this.token})
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res.body.beverageBody).to.eql('test beverage');
        expect(res.body.author).to.eql('test');
        done();
      });
  });

  describe('routes that need a beverage in the database', function () {
    beforeEach(function (done) {
      var testBeverage = new Beverage({beverageBody: 'test', token: this.token});
      testBeverage.save(function (err, data) {
        if (err) throw err;
        this.testBeverage = data;
        done();
      }.bind(this));
    });

    it('should be able to update a beverage', function (done) {
      chai.request(url)
        .put('/beverages/' + this.testBeverage._id)
        .send({beverageBody: 'new beverageBody', token: this.token})
        .end(function (err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });

    it('should be able to delete a beverage', function (done) {
      chai.request(url)
        .delete('/beverages/' + this.testBeverage._id)
        .set('token', this.token)
        .end(function (err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });
  });
});