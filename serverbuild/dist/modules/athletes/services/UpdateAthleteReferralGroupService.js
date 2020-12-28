"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IReferralGroupsRepository = _interopRequireDefault(require("../../referralgroups/repositories/IReferralGroupsRepository"));

var _IAthletesRepository = _interopRequireDefault(require("../repositories/IAthletesRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateAthleteReferralGroupService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AthletesRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('ReferralGroupsRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IAthletesRepository.default === "undefined" ? Object : _IAthletesRepository.default, typeof _IReferralGroupsRepository.default === "undefined" ? Object : _IReferralGroupsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateAthleteReferralGroupService {
  constructor(athletesRepository, referralGroupsRepository) {
    this.athletesRepository = athletesRepository;
    this.referralGroupsRepository = referralGroupsRepository;
  }

  async execute({
    id,
    referral_group_id
  }) {
    const athlete = await this.athletesRepository.findOne({
      id
    });

    if (!athlete) {
      throw new _AppError.default(404, 'Aluno não encontrado');
    }

    const referralGroup = await this.referralGroupsRepository.findOne({
      referral_group_id
    });

    if (!referralGroup) {
      throw new _AppError.default(404, 'Grupo de indicações não encontrado');
    }

    athlete.referral_group_id = referral_group_id;
    await this.athletesRepository.save(athlete);
    return athlete;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = UpdateAthleteReferralGroupService;
exports.default = _default;