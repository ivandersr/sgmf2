"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _AthleteGroup = _interopRequireDefault(require("../entities/AthleteGroup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AthleteGroupsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_AthleteGroup.default);
  }

  async find() {
    const athleteGroups = await this.ormRepository.find();
    return athleteGroups;
  }

  async findOne(data) {
    const athleteGroup = this.ormRepository.findOne(data);
    return athleteGroup;
  }

  async create({
    title,
    description
  }) {
    const athleteGroup = this.ormRepository.create({
      title,
      description
    });
    await this.ormRepository.save(athleteGroup);
    return athleteGroup;
  }

}

var _default = AthleteGroupsRepository;
exports.default = _default;