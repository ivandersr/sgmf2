"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dateFns = require("date-fns");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _ISubscriptionsRepository = _interopRequireDefault(require("../../subscriptions/repositories/ISubscriptionsRepository"));

var _IAthleteGroupsRepository = _interopRequireDefault(require("../../athletegroups/repositories/IAthleteGroupsRepository"));

var _IAthletesRepository = _interopRequireDefault(require("../repositories/IAthletesRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateAthleteService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AthletesRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('SubscriptionsRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('AthleteGroupsRepository')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IAthletesRepository.default === "undefined" ? Object : _IAthletesRepository.default, typeof _ISubscriptionsRepository.default === "undefined" ? Object : _ISubscriptionsRepository.default, typeof _IAthleteGroupsRepository.default === "undefined" ? Object : _IAthleteGroupsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreateAthleteService {
  constructor(athletesRepository, subscriptionsRepository, athleteGroupsRepository) {
    this.athletesRepository = athletesRepository;
    this.subscriptionsRepository = subscriptionsRepository;
    this.athleteGroupsRepository = athleteGroupsRepository;
  }

  async execute({
    name,
    birthDate,
    phoneNumber,
    subscription_id,
    athlete_group_id
  }) {
    if (!name) {
      throw new _AppError.default(400, 'Nome não pode estar vazio (name).');
    }

    if (!birthDate) {
      throw new _AppError.default(400, 'Data de nascimento não pode estar vazia (birthDate).');
    }

    if (!subscription_id) {
      throw new _AppError.default(400, 'Por favor, indique o plano desejado (subscription_id).');
    }

    if (!athlete_group_id) {
      throw new _AppError.default(400, 'Indique a qual grupo o aluno pertence (athlete_group_id).');
    }

    const subscription = await this.subscriptionsRepository.findOne({
      id: subscription_id
    });
    const athleteGroup = await this.athleteGroupsRepository.findOne({
      id: athlete_group_id
    });

    if (!subscription) {
      throw new _AppError.default(404, 'Plano não encontrado');
    }

    if (!athleteGroup) {
      throw new _AppError.default(404, 'Grupo não encontrado');
    }

    const athlete = await this.athletesRepository.create({
      name,
      birthDate: (0, _dateFns.parseISO)(birthDate),
      phoneNumber,
      subscription,
      athleteGroup
    });
    return athlete;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = CreateAthleteService;
exports.default = _default;