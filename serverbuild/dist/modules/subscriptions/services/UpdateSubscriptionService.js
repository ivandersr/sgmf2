"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _ISubscriptionsRepository = _interopRequireDefault(require("../repositories/ISubscriptionsRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateSubscriptionService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('SubscriptionsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ISubscriptionsRepository.default === "undefined" ? Object : _ISubscriptionsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdateSubscriptionService {
  constructor(subscriptionsRepository) {
    this.subscriptionsRepository = subscriptionsRepository;
  }

  async execute({
    id,
    title,
    value
  }) {
    const subscription = await this.subscriptionsRepository.findOne({
      id
    });

    if (!subscription) {
      throw new _AppError.default(404, 'Plano não encontrado');
    }

    Object.assign(subscription, {
      title,
      value
    });
    await this.subscriptionsRepository.save(subscription);
    return subscription;
  }

}) || _class) || _class) || _class) || _class);
var _default = UpdateSubscriptionService;
exports.default = _default;