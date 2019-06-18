'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _users = require('./users.da');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  getAll,
  update,
  create,
  remove
};


const getAll = (req, res) => () => {
  _users2.default.getAll().then(users => res.status(200).json(users)).catch(() => res.sendStatus(422));
};

const update = (req, res) => () => {
  const {
    id
  } = req.params;
  const {
    name,
    title,
    company,
    skills
  } = req.body;

  _users2.default.update(id, name, title, company, skills).then(() => res.sendStatus(200)).catch(() => res.sendStatus(422));
};

const create = (req, res) => () => {
  const {
    name,
    title = '',
    company = '',
    skills = []
  } = req.body;

  _users2.default.create(name, title, company, user).then(user => res.status(200).json(user)).catch(() => res.sendStatus(422));
};

function remove(req, res) {
  const {
    id
  } = req.params;

  _users2.default.remove(id).then(() => res.sendStatus(200)).catch(() => res.sendStatus(422));
}