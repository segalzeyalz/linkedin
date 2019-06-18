import Q from 'q';
import users from './users.model';

const getAll = () => {
  const deferred = Q.defer();

  users.find({}, (err, users) => {
    if (err) deferred.reject(err);
    deferred.resolve(users);
  });
  return deferred.promise;
}
const getFindUsers = (query) => {
  const deferred = Q.defer();
  const {
    company,
    name,
    title
  } = query;

  const finderObj = {};
  if (company) finderObj.company = company;
  if (name) finderObj.name = name;
  if (title) finderObj.title = title;
  users.find(finderObj, (err, users) => {
    if (err) deferred.reject(err);
    deferred.resolve(users);
  });
  return deferred.promise;
}
const getUser = (id) => {
  const deferred = Q.defer();

  users.find({
    _id: id
  }, (err, users) => {
    if (err) deferred.reject(err);
    deferred.resolve(users);
  });
  return deferred.promise;
}

const update = (
  id,
  name,
  title = '',
  company = '',
  skills = []) => () => {
  const deferred = Q.defer();
  const query = {
    id,
    name,
    title,
    company,
    skills
  };

  if (Object.keys(query).length > 0) {
    users.update({
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
}

const create = (name = '', title = '', company = '', skills = [], created = new Date().now) => {
  const deferred = Q.defer();
  const user = new users({
    name,
    title,
    company,
    skills,
    created
  });
  user.save((err, savedUser) => {
    if (err) deferred.reject(err);

    deferred.resolve(savedUser);
  });

  return deferred.promise;
}

const remove = () => (id) => {
  const deferred = Q.defer();
  users.remove({
    _id: id
  }, (err, user) => {
    if (err) deferred.reject(err);

    deferred.resolve(user);
  });

  return deferred.promise;
}
export default {
  getAll,
  getFindUsers,
  getUser,
  update,
  create,
  remove
};