"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _athletes = _interopRequireDefault(require("../../../../modules/athletes/infra/http/routes/athletes.routes"));

var _subscriptions = _interopRequireDefault(require("../../../../modules/subscriptions/infra/http/routes/subscriptions.routes"));

var _users = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/users.routes"));

var _sessions = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/sessions.routes"));

var _athletegroups = _interopRequireDefault(require("../../../../modules/athletegroups/infra/http/routes/athletegroups.routes"));

var _referralgroups = _interopRequireDefault(require("../../../../modules/referralgroups/infra/http/routes/referralgroups.routes"));

var _payments = _interopRequireDefault(require("../../../../modules/payments/infra/http/routes/payments.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use('/athletes', _athletes.default);
routes.use('/subscriptions', _subscriptions.default);
routes.use('/users', _users.default);
routes.use('/sessions', _sessions.default);
routes.use('/athletegroups', _athletegroups.default);
routes.use('/referralgroups', _referralgroups.default);
routes.use('/payments', _payments.default);
var _default = routes;
exports.default = _default;