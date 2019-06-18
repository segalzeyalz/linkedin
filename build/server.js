'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _config = require('./config/config');

var _config2 = _interopRequireDefault(_config);

var _express3 = require('./config/express');

var _express4 = _interopRequireDefault(_express3);

var _routes = require('./config/routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Server {
  constructor() {
    this.app = (0, _express2.default)();
    this.config = _config2.default;

    this.init();
  }

  init() {
    // HTTP request logger
    this.app.use((0, _morgan2.default)('dev'));

    // express settings
    (0, _express4.default)(this.app);

    // connect to database
    _mongoose2.default.connect(this.config.db, err => {
      if (err) {
        console.log(`[MongoDB] Failed to connect. ${err}`);
      } else {
        console.log(`[MongoDB] connected: ${this.config.db}`);

        // initialize api
        (0, _routes2.default)(this.app);

        // start server
        this.app.listen(this.config.apiPort, () => {
          console.log(`[Server] listening on port ${this.config.apiPort}`);
        });
      }
    });
  }
}

exports.default = new Server().app;