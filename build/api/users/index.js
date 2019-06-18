'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _users = require('./users.ctrl');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();
router.route('/users')
// GET /api/v1/users - Get list of users
.get(_users2.default.getAll)

// POST /api/v1/users - Create new users
.post(_users2.default.create);

router.route('/users/:id')

// DELETE /api/v1/users/:id - Delete user
.delete(_users2.default.remove)

// PUT /api/v1/users/:id - Update user
.put(_users2.default.update);

exports.default = router;