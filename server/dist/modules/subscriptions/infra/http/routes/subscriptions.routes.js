"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../../shared/infra/http/middlewares/ensureAuthenticated"));

var _SubscriptionsController = _interopRequireDefault(require("../controllers/SubscriptionsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const subscriptionsRouter = (0, _express.Router)();
const subscriptionsController = new _SubscriptionsController.default();
subscriptionsRouter.use(_ensureAuthenticated.default);
subscriptionsRouter.get('/', subscriptionsController.index);
subscriptionsRouter.post('/', subscriptionsController.create);
subscriptionsRouter.put('/:id', subscriptionsController.update);
var _default = subscriptionsRouter;
exports.default = _default;