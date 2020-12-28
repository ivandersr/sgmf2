"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AthleteGroup = _interopRequireDefault(require("../../infra/typeorm/entities/AthleteGroup"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeAthleteGroupsRepository {
  constructor() {
    this.athleteGroups = [];
  }

  async create({
    title,
    description
  }) {
    const athleteGroup = new _AthleteGroup.default();
    Object.assign(athleteGroup, {
      id: (0, _uuid.v4)(),
      title,
      description
    });
    this.athleteGroups.push(athleteGroup);
    return athleteGroup;
  }

  async find() {
    return this.athleteGroups;
  }

  async findOne({
    id
  }) {
    const athleteGroup = this.athleteGroups.find(group => group.id === id);
    return athleteGroup;
  }

}

var _default = FakeAthleteGroupsRepository;
exports.default = _default;