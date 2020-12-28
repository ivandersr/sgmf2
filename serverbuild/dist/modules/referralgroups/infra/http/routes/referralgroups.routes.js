"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../../shared/infra/http/middlewares/ensureAuthenticated"));

var _ReferralGroupsController = _interopRequireDefault(require("../controllers/ReferralGroupsController"));

var _ReferralGroupAthletesController = _interopRequireDefault(require("../controllers/ReferralGroupAthletesController"));

var _RefGroupActiveAthletesController = _interopRequireDefault(require("../controllers/RefGroupActiveAthletesController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const referralGroupsRouter = (0, _express.Router)();
const referralGroupsController = new _ReferralGroupsController.default();
const referralGroupAthletesController = new _ReferralGroupAthletesController.default();
const refGroupActiveAthletesController = new _RefGroupActiveAthletesController.default();
referralGroupsRouter.use(_ensureAuthenticated.default);
referralGroupsRouter.get('/', referralGroupsController.index);
referralGroupsRouter.get('/:id', referralGroupsController.find);
referralGroupsRouter.get('/:id/all', referralGroupAthletesController.index);
referralGroupsRouter.get('/:id/active', refGroupActiveAthletesController.index);
referralGroupsRouter.post('/', referralGroupsController.create);
var _default = referralGroupsRouter;
exports.default = _default;