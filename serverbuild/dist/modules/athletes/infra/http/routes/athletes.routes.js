"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../../shared/infra/http/middlewares/ensureAuthenticated"));

var _AthletesController = _interopRequireDefault(require("../controllers/AthletesController"));

var _AthleteRefGroupsController = _interopRequireDefault(require("../controllers/AthleteRefGroupsController"));

var _AthleteStatusController = _interopRequireDefault(require("../controllers/AthleteStatusController"));

var _AthleteSubscriptionsController = _interopRequireDefault(require("../controllers/AthleteSubscriptionsController"));

var _AthleteAthleteGroupsController = _interopRequireDefault(require("../controllers/AthleteAthleteGroupsController"));

var _AthetesFilterController = _interopRequireDefault(require("../controllers/AthetesFilterController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const athletesRouter = (0, _express.Router)();
const athletesController = new _AthletesController.default();
const athleteRefGroupsController = new _AthleteRefGroupsController.default();
const athleteStatusController = new _AthleteStatusController.default();
const athleteSubscriptionsController = new _AthleteSubscriptionsController.default();
const athleteAthleteGroupsController = new _AthleteAthleteGroupsController.default();
const athletesFilterController = new _AthetesFilterController.default();
athletesRouter.use(_ensureAuthenticated.default);
athletesRouter.get('/', athletesController.index);
athletesRouter.get('/filter', athletesFilterController.find);
athletesRouter.get('/:id', athletesController.find);
athletesRouter.post('/', athletesController.create);
athletesRouter.put('/:id', athletesController.update);
athletesRouter.put('/referral/:id', athleteRefGroupsController.update);
athletesRouter.put('/active/:id', athleteStatusController.update);
athletesRouter.put('/subscription/:id', athleteSubscriptionsController.update);
athletesRouter.put('/group/:id', athleteAthleteGroupsController.update);
var _default = athletesRouter;
exports.default = _default;