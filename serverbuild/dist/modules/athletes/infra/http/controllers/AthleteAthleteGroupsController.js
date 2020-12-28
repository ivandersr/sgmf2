"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _UpdateAthleteAthleteGroupService = _interopRequireDefault(require("../../../services/UpdateAthleteAthleteGroupService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AthleteAthleteGroupsController {
  async update(request, response) {
    const {
      id
    } = request.params;
    const {
      athlete_group_id
    } = request.body;

    const updateAthleteAthleteGroup = _tsyringe.container.resolve(_UpdateAthleteAthleteGroupService.default);

    const athlete = await updateAthleteAthleteGroup.execute({
      athlete_id: id,
      athlete_group_id
    });
    return response.status(200).json(athlete);
  }

}

var _default = AthleteAthleteGroupsController;
exports.default = _default;