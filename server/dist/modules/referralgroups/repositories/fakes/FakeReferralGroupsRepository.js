"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

var _ReferralGroup = _interopRequireDefault(require("../../infra/typeorm/entities/ReferralGroup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeReferralGroupsRepository {
  constructor() {
    this.referralGroups = [];
  }

  async find() {
    return this.referralGroups;
  }

  async findOne({
    referral_group_id
  }) {
    const referralGroup = this.referralGroups.find(refGroup => refGroup.id === referral_group_id);
    return referralGroup;
  }

  async create({
    title,
    referral
  }) {
    const referralGroup = new _ReferralGroup.default();
    Object.assign(referralGroup, {
      id: (0, _uuid.v4)(),
      title,
      referral
    });
    this.referralGroups.push(referralGroup);
    return referralGroup;
  }

  async save(data) {
    const findIndex = this.referralGroups.findIndex(refGroup => refGroup.id === data.id);

    if (findIndex !== -1) {
      Object.assign(this.referralGroups[findIndex], data);
      return this.referralGroups[findIndex];
    }

    this.referralGroups.push(data);
    return data;
  }

}

var _default = FakeReferralGroupsRepository;
exports.default = _default;