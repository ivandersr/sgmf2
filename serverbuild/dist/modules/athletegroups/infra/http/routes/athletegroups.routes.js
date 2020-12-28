"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../../shared/infra/http/middlewares/ensureAuthenticated"));

var _AthleteGroupsController = _interopRequireDefault(require("../controllers/AthleteGroupsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const athleteGroupsRouter = (0, _express.Router)();
const athleteGroupsController = new _AthleteGroupsController.default();
athleteGroupsRouter.use(_ensureAuthenticated.default);
athleteGroupsRouter.get('/', athleteGroupsController.index);
athleteGroupsRouter.post('/', athleteGroupsController.create);
var _default = athleteGroupsRouter;
exports.default = _default;