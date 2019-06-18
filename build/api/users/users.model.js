'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UsersSchema = new _mongoose2.default.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  company: {
    type: String,
    default: ''
  },
  skills: {
    type: [String],
    default: []
  },
  created: {
    type: Date,
    default: Date.now
  }
});

exports.default = _mongoose2.default.model('users', UsersSchema);