"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _IReferralGroupsRepository = _interopRequireDefault(require("../repositories/IReferralGroupsRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let FindReferralGroupService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ReferralGroupsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IReferralGroupsRepository.default === "undefined" ? Object : _IReferralGroupsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class FindReferralGroupService {
  constructor(referralGroupsRepository) {
    this.referralGroupsRepository = referralGroupsRepository;
  }

  async execute({
    referral_group_id
  }) {
    if (!referral_group_id) {
      throw new _AppError.default(400, 'Informe id do grupo de indicações');
    }

    const referralGroup = await this.referralGroupsRepository.findOne({
      referral_group_id
    });

    if (!referralGroup) {
      throw new _AppError.default(404, 'Grupo de indicações não encontrado');
    }

    return referralGroup;
  }

}) || _class) || _class) || _class) || _class);
var _default = FindReferralGroupService;
exports.default = _default;