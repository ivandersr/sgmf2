"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListAthletesByReferralGroupService = _interopRequireDefault(require("../../../../athletes/services/ListAthletesByReferralGroupService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ReferralGroupAthletesController {
  async index(request, response) {
    const {
      id
    } = request.params;

    const listByReferralGroup = _tsyringe.container.resolve(_ListAthletesByReferralGroupService.default);

    const activeByReferral = await listByReferralGroup.execute({
      referral_group_id: id
    });
    return response.status(200).json(activeByReferral);
  }

}

var _default = ReferralGroupAthletesController;
exports.default = _default;