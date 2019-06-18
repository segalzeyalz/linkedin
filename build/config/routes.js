'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _users = require('../api/users');

var _users2 = _interopRequireDefault(_users);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const API_V1 = '/api/v1';

exports.default = app => {
  app.get(API_V1, (req, res) => {
    res.json({ version: _package2.default.version });
  });

  app.use(API_V1, _users2.default);
};