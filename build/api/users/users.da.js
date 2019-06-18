'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _users = require('./users.model');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getAll = () => {
  const deferred = _q2.default.defer();

  _users2.default.find({}, (err, users) => {
    if (err) deferred.reject(err);
    deferred.resolve(users);
  });
  return deferred.promise;
};

const update = (id, name, title = '', company = '', skills = []) => () => {
  const deferred = _q2.default.defer();
  const query = {
    id,
    name,
    title,
    company,
    skills
  };

  if (Object.keys(query).length > 0) {
    _users2.default.update({
      _id: id
    }, {
      $set: query
    }, (err, user) => {
      if (err) deferred.reject(err);

      deferred.resolve(user);
    });
  } else {
    // reject promise if name and completed information is missing
    deferred.reject({});
  }

  return deferred.promise;
};

const create = () => (name = '', title = '', company = '', skills = [], created = new Date().now) => {
  const deferred = _q2.default.defer();
  const user = new user({
    name,
    title,
    company,
    skills,
    created
  });
  _users2.default.save((err, savedUser) => {
    if (err) deferred.reject(err);

    deferred.resolve(savedUser);
  });

  return deferred.promise;
};

const remove = () => id => {
  const deferred = _q2.default.defer();
  _users2.default.remove({
    _id: id
  }, (err, user) => {
    if (err) deferred.reject(err);

    deferred.resolve(user);
  });

  return deferred.promise;
};
exports.default = {
  getAll,
  update,
  create,
  remove
};