"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Subscription = _interopRequireDefault(require("../entities/Subscription"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SubscriptionsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Subscription.default);
  }

  async create(data) {
    const subscription = this.ormRepository.create(data);
    await this.ormRepository.save(subscription);
    return subscription;
  }

  async save(data) {
    await this.ormRepository.save(data);
    return data;
  }

  async find() {
    const subscriptions = await this.ormRepository.find();
    return subscriptions;
  }

  async findAndCount(options) {
    const result = await this.ormRepository.findAndCount(options);
    return result;
  }

  async findOne(data) {
    const subscription = await this.ormRepository.findOne(data);
    return subscription;
  }

}

var _default = SubscriptionsRepository;
exports.default = _default;