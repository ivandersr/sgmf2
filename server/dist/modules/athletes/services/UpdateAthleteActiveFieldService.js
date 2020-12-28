"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IAthletesRepository = _interopRequireDefault(require("../repositories/IAthletesRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateAthleteActiveFieldService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AthletesRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IAthletesRepository.default === "undefined" ? Object : _IAthletesRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdateAthleteActiveFieldService {
  constructor(athletesRepository) {
    this.athletesRepository = athletesRepository;
  }

  async execute({
    athlete_id,
    active
  }) {
    const athlete = await this.athletesRepository.findOne({
      id: athlete_id
    });

    if (!athlete) {
      throw new _AppError.default(404, 'Aluno não encontrado');
    }

    athlete.active = active;
    await this.athletesRepository.save(athlete);
    return athlete;
  }

}) || _class) || _class) || _class) || _class);
var _default = UpdateAthleteActiveFieldService;
exports.default = _default;