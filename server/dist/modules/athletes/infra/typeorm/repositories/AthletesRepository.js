"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Athlete = _interopRequireDefault(require("../entities/Athlete"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AthletesRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Athlete.default);
  }

  async findAndCount(options) {
    const result = await this.ormRepository.findAndCount(options);
    return result;
  }

  async findByName({
    text,
    skip,
    take,
    order
  }) {
    const result = await this.ormRepository.findAndCount({
      where: {
        name: (0, _typeorm.ILike)(`%${text}%`)
      },
      skip,
      take,
      order
    });
    return result;
  }

  async findOne(data) {
    const athlete = await this.ormRepository.findOne(data);
    return athlete;
  }

  async create(data) {
    const athlete = this.ormRepository.create(data);
    await this.ormRepository.save(athlete);
    return athlete;
  }

  async save(data) {
    await this.ormRepository.save(data);
    return data;
  }

  async findByReferralGroup({
    referral_group_id
  }) {
    const athletes = await this.ormRepository.find({
      where: {
        referral_group_id
      }
    });
    return athletes;
  }

  async findActiveByReferralGroup({
    referral_group_id
  }) {
    const athletes = await this.ormRepository.find({
      where: {
        referral_group_id,
        active: true
      }
    });
    const count = athletes.length;
    return {
      athletes,
      count
    };
  }

}

var _default = AthletesRepository;
exports.default = _default;