"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _UpdateAthleteReferralGroupService = _interopRequireDefault(require("../../../services/UpdateAthleteReferralGroupService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AthleteRefGroupsController {
  async update(request, response) {
    const {
      id
    } = request.params;
    const {
      referral_group_id
    } = request.body;

    const updateReferral = _tsyringe.container.resolve(_UpdateAthleteReferralGroupService.default);

    const updatedAthlete = await updateReferral.execute({
      id,
      referral_group_id
    });
    return response.status(200).json(updatedAthlete);
  }

}

var _default = AthleteRefGroupsController;
exports.default = _default;