"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

var _Subscription = _interopRequireDefault(require("../../infra/typeorm/entities/Subscription"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeSubscriptionsRepository {
  constructor() {
    this.subscriptions = [];
  }

  async find() {
    return this.subscriptions;
  }

  async findAndCount(options) {
    if (options) {
      const {
        skip,
        take
      } = options;

      if (skip && take) {
        const findSubscriptions = this.subscriptions.slice(skip, skip + take);
        return [findSubscriptions, this.subscriptions.length];
      }
    }

    return [this.subscriptions, this.subscriptions.length];
  }

  async findOne({
    id
  }) {
    const findSubscription = this.subscriptions.find(subscription => subscription.id === id);
    return findSubscription;
  }

  async create({
    title,
    value
  }) {
    const newSubscription = new _Subscription.default();
    Object.assign(newSubscription, {
      id: (0, _uuid.v4)(),
      title,
      value
    });
    this.subscriptions.push(newSubscription);
    return newSubscription;
  }

  async save(data) {
    const findIndex = this.subscriptions.findIndex(subscription => subscription.id === data.id);

    if (findIndex !== -1) {
      this.subscriptions[findIndex] = data;
      return data;
    }

    this.subscriptions.push(data);
    return data;
  }

}

var _default = FakeSubscriptionsRepository;
exports.default = _default;