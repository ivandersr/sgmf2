"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FindAthletesByNameService = _interopRequireDefault(require("../../../services/FindAthletesByNameService"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AthletesFilterController {
  async find(request, response) {
    const {
      text
    } = request.body;
    const {
      page,
      pageSize
    } = request.query;

    const filterAthletes = _tsyringe.container.resolve(_FindAthletesByNameService.default);

    const athletes = await filterAthletes.execute({
      text,
      page: String(page),
      pageSize: String(pageSize)
    });
    return response.status(200).json(athletes);
  }

}

var _default = AthletesFilterController;
exports.default = _default;