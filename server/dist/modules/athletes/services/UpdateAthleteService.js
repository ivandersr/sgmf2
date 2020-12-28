"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _dateFns = require("date-fns");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IAthletesRepository = _interopRequireDefault(require("../repositories/IAthletesRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateAthleteService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AthletesRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IAthletesRepository.default === "undefined" ? Object : _IAthletesRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdateAthleteService {
  constructor(athletesRepository) {
    this.athletesRepository = athletesRepository;
  }

  async execute({
    id,
    name,
    birthDate,
    phoneNumber
  }) {
    const athlete = await this.athletesRepository.findOne({
      id
    });

    if (!athlete) {
      throw new _AppError.default(404, 'Aluno não encontrado');
    }

    if (!name || !birthDate || !phoneNumber) {
      throw new _AppError.default(400, 'Informe nome, data de nascimento e telefone');
    }

    Object.assign(athlete, {
      name,
      birthDate: (0, _dateFns.parseISO)(birthDate),
      phoneNumber
    });
    await this.athletesRepository.save(athlete);
    return athlete;
  }

}) || _class) || _class) || _class) || _class);
var _default = UpdateAthleteService;
exports.default = _default;