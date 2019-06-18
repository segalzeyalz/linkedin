import chai from 'chai';
import mongoose from 'mongoose';
import {
  Mockgoose
} from 'mockgoose';
import chaiHttp from 'chai-http';
import server from '../src/server';
import config from '../src/config/config';

const mockgoose = new Mockgoose(mongoose);

chai.should();
chai.use(chaiHttp);

/**
 * Add mockUsers into storage
 */
const addUserToStorage = (name, cb) => () => {
  chai
    .request(server)
    .post('/api/v1/users')
    .send({
      name
    })
    .end((err, res) => {
      if (cb) {
        cb(err, res);
      }
    });
}

describe('users', () => {
  before(done => {
    mongoose.disconnect();
    mockgoose.helper.reset();
    mockgoose.prepareStorage().then(() => {
      mongoose.connect(
        config.db,
        err => {
          done(err);
        }
      );
    });
  });

  describe('/GET user', () => {
    it('it should get a empty list of users', done => {
      chai
        .request(server)
        .get('/api/v1/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array').with.lengthOf(0);
          done();
        });
    });

    it('it should get a list of userss', done => {
      addUsersToStorage('Mock users', (err, res) => {
        chai
          .request(server)
          .get('/api/v1/users')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array').with.lengthOf(1);
            res.body.should.to.deep.equal([res.body[0]]);
            done();
          });
      });
    });
  });

  describe('/POST users', () => {
    it('should create a users with a name property', done => {
      const payload = {
        name: 'Just another user',
        title: 'title',
        comapny: 'comp',
        sklls: ['comp', 'comp2'],

      };
      chai
        .request(server)
        .post('/api/v1/users')
        .send(payload)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name').eql(payload.name);
          res.body.should.have.property('title').eql(payload.title);
          res.body.should.have.property('company').eql(payload.company);
          done();
        });
    });

    it('should not create a users with a missing name property', done => {
      chai
        .request(server)
        .post('/api/v1/users')
        .end((err, res) => {
          res.should.have.status(422);
          done();
        });
    });
  });

  describe('/PUT users/:id', () => {
    let usersMock;

    before(done => {
      addUserToStorage('Mock users Name for Modification', (err, res) => {
        usersMock = res.body;
        done();
      });
    });

    it('should update a users', done => {
      const update = {
        name: 'Renamed user',
        title: 'new title',
        comapny: 'new comp',
        sklls: ['comps']
      };

      chai
        .request(server)
        .put('/api/v1/users/' + usersMock._id)
        .send(update)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('should return a 422 status if body is missing', done => {
      chai
        .request(server)
        .put('/api/v1/users/' + usersMock._id)
        .end((err, res) => {
          res.should.have.status(422);
          done();
        });
    });

    it('should return a 422 status if id is wrong', done => {
      chai
        .request(server)
        .put('/api/v1/users/A-WRONG-ID')
        .send({
          name: 'Test'
        })
        .end((err, res) => {
          res.should.have.status(422);
          done();
        });
    });
  });

  describe('/DELETE users/:id', () => {
    let usersMock;

    before(done => {
      addUsersToStorage('Mock user Name to delete', (err, res) => {
        usersMock = res.body;
        done();
      });
    });

    it('should delete a user', done => {
      chai
        .request(server)
        .delete('/api/v1/users/' + usersMock._id)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('should return a 422 status if id is wrong', done => {
      chai
        .request(server)
        .put('/api/v1/users/A-WRONG-ID')
        .end((err, res) => {
          res.should.have.status(422);
          done();
        });
    });
  });
});