"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateAthleteGroupService = _interopRequireDefault(require("../../../services/CreateAthleteGroupService"));

var _FindAtheteGroupsService = _interopRequireDefault(require("../../../services/FindAtheteGroupsService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AthleteGroupsController {
  async index(request, response) {
    const findAthleteGroups = _tsyringe.container.resolve(_FindAtheteGroupsService.default);

    const athleteGroups = await findAthleteGroups.execute();
    return response.status(200).json(athleteGroups);
  }

  async create(request, response) {
    const {
      title,
      description
    } = request.body;

    const createAthleteGroup = _tsyringe.container.resolve(_CreateAthleteGroupService.default);

    const athleteGroup = await createAthleteGroup.execute({
      title,
      description
    });
    return response.status(201).json(athleteGroup);
  }

}

var _default = AthleteGroupsController;
exports.default = _default;