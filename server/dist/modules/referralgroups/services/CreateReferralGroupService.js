"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _IAthletesRepository = _interopRequireDefault(require("../../athletes/repositories/IAthletesRepository"));

var _IReferralGroupsRepository = _interopRequireDefault(require("../repositories/IReferralGroupsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateReferralGroupService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ReferralGroupsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('AthletesRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IReferralGroupsRepository.default === "undefined" ? Object : _IReferralGroupsRepository.default, typeof _IAthletesRepository.default === "undefined" ? Object : _IAthletesRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateReferralGroupService {
  constructor(referralGroupsRepository, athletesRepository) {
    this.referralGroupsRepository = referralGroupsRepository;
    this.athletesRepository = athletesRepository;
  }

  async execute({
    referral_id
  }) {
    if (!referral_id) {
      throw new _AppError.default(400, 'O grupo deve ter um(a) aluno(a) de referência (quem indicou).');
    }

    const athlete = await this.athletesRepository.findOne({
      id: referral_id
    });

    if (!athlete) {
      throw new _AppError.default(404, 'Aluno(a) não encontrado(a).');
    }

    const {
      name
    } = athlete;
    const referralGroup = await this.referralGroupsRepository.create({
      title: name,
      referral: athlete
    });
    Object.assign(athlete, {
      referralGroup
    });
    await this.athletesRepository.save(athlete);
    return referralGroup;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = CreateReferralGroupService;
exports.default = _default;