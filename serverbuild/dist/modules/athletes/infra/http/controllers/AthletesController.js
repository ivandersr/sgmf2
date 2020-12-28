"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateAthleteService = _interopRequireDefault(require("../../../services/CreateAthleteService"));

var _FindAthleteService = _interopRequireDefault(require("../../../services/FindAthleteService"));

var _ListAthletesService = _interopRequireDefault(require("../../../services/ListAthletesService"));

var _UpdateAthleteService = _interopRequireDefault(require("../../../services/UpdateAthleteService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AthletesController {
  async index(request, response) {
    const listAthletes = _tsyringe.container.resolve(_ListAthletesService.default);

    const {
      page,
      pageSize
    } = request.query;
    const athletes = await listAthletes.execute({
      page: String(page),
      pageSize: String(pageSize)
    });
    return response.status(200).json(athletes);
  }

  async create(request, response) {
    const {
      name,
      birthDate,
      phoneNumber,
      subscription_id,
      athlete_group_id
    } = request.body;

    const createAthleteService = _tsyringe.container.resolve(_CreateAthleteService.default);

    const athlete = await createAthleteService.execute({
      name,
      birthDate,
      phoneNumber,
      subscription_id,
      athlete_group_id
    });
    return response.status(201).json(athlete);
  }

  async find(request, response) {
    const findAthlete = _tsyringe.container.resolve(_FindAthleteService.default);

    const {
      id
    } = request.params;
    const athlete = await findAthlete.execute({
      id
    });
    return response.status(200).json(athlete);
  }

  async update(request, response) {
    const {
      id
    } = request.params;
    const {
      name,
      birthDate,
      phoneNumber
    } = request.body;

    const updateAthlete = _tsyringe.container.resolve(_UpdateAthleteService.default);

    const updatedAthlete = await updateAthlete.execute({
      id,
      name,
      birthDate,
      phoneNumber
    });
    return response.status(200).json(updatedAthlete);
  }

}

var _default = AthletesController;
exports.default = _default;