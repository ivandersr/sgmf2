"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _UpdateAthleteSubscriptionService = _interopRequireDefault(require("../../../services/UpdateAthleteSubscriptionService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AthleteSubscriptionsController {
  async update(request, response) {
    const {
      id
    } = request.params;
    const {
      subscription_id
    } = request.body;

    const updateAthleteSubscription = _tsyringe.container.resolve(_UpdateAthleteSubscriptionService.default);

    const athlete = await updateAthleteSubscription.execute({
      athlete_id: id,
      subscription_id
    });
    return response.status(200).json(athlete);
  }

}

var _default = AthleteSubscriptionsController;
exports.default = _default;