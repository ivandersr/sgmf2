"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IAthleteGroupsRepository = _interopRequireDefault(require("../../athletegroups/repositories/IAthleteGroupsRepository"));

var _IAthletesRepository = _interopRequireDefault(require("../repositories/IAthletesRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateAthleteAthleteGroupService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AthletesRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('AthleteGroupsRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IAthletesRepository.default === "undefined" ? Object : _IAthletesRepository.default, typeof _IAthleteGroupsRepository.default === "undefined" ? Object : _IAthleteGroupsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateAthleteAthleteGroupService {
  constructor(athletesRepository, athleteGroupsRepository) {
    this.athletesRepository = athletesRepository;
    this.athleteGroupsRepository = athleteGroupsRepository;
  }

  async execute({
    athlete_id,
    athlete_group_id
  }) {
    const athlete = await this.athletesRepository.findOne({
      id: athlete_id
    });

    if (!athlete) {
      throw new _AppError.default(404, 'Aluno não encontrado');
    }

    const athleteGroup = await this.athleteGroupsRepository.findOne({
      id: athlete_group_id
    });

    if (!athleteGroup) {
      throw new _AppError.default(404, 'Grupo não encontrada');
    }

    athlete.athleteGroup = athleteGroup;
    await this.athletesRepository.save(athlete);
    return athlete;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = UpdateAthleteAthleteGroupService;
exports.default = _default;