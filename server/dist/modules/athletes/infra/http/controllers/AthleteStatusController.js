"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _UpdateAthleteActiveFieldService = _interopRequireDefault(require("../../../services/UpdateAthleteActiveFieldService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AthleteStatusController {
  async update(request, response) {
    const {
      id
    } = request.params;
    const {
      active
    } = request.body;

    const updateAthleteActiveField = _tsyringe.container.resolve(_UpdateAthleteActiveFieldService.default);

    const athlete = await updateAthleteActiveField.execute({
      athlete_id: id,
      active
    });
    return response.status(200).json(athlete);
  }

}

var _default = AthleteStatusController;
exports.default = _default;