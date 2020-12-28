"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _ReferralGroup = _interopRequireDefault(require("../entities/ReferralGroup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ReferralGroupsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_ReferralGroup.default);
  }

  async find() {
    const referralGroups = await this.ormRepository.find();
    return referralGroups;
  }

  async findOne({
    referral_group_id
  }) {
    const referralGroup = await this.ormRepository.findOne(referral_group_id);
    return referralGroup;
  }

  async create(data) {
    const referralGroup = this.ormRepository.create(data);
    await this.ormRepository.save(referralGroup);
    return referralGroup;
  }

  async save(data) {
    await this.ormRepository.save(data);
    return data;
  }

}

var _default = ReferralGroupsRepository;
exports.default = _default;