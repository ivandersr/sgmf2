"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../../shared/infra/http/middlewares/ensureAuthenticated"));

var _PaymentsByDateAndAthleteController = _interopRequireDefault(require("../controllers/PaymentsByDateAndAthleteController"));

var _PaymentsByDateController = _interopRequireDefault(require("../controllers/PaymentsByDateController"));

var _PaymentsController = _interopRequireDefault(require("../controllers/PaymentsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const paymentsRouter = (0, _express.Router)();
const paymentsController = new _PaymentsController.default();
const byDateController = new _PaymentsByDateController.default();
const byDateAndAthleteController = new _PaymentsByDateAndAthleteController.default();
paymentsRouter.use(_ensureAuthenticated.default);
paymentsRouter.post('/', paymentsController.create);
paymentsRouter.get('/byathlete', paymentsController.find);
paymentsRouter.get('/bydate', byDateController.find);
paymentsRouter.get('/bydateandathlete', byDateAndAthleteController.find);
var _default = paymentsRouter;
exports.default = _default;