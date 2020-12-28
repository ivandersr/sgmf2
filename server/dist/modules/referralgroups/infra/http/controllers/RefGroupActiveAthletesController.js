"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListActiveAthletesByReferralGroupService = _interopRequireDefault(require("../../../../athletes/services/ListActiveAthletesByReferralGroupService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RefGroupActiveAthletesController {
  async index(request, response) {
    const {
      id
    } = request.params;

    const listActiveByReferral = _tsyringe.container.resolve(_ListActiveAthletesByReferralGroupService.default);

    const athletesByReferral = await listActiveByReferral.execute({
      referral_group_id: id
    });
    return response.status(200).json(athletesByReferral);
  }

}

var _default = RefGroupActiveAthletesController;
exports.default = _default;