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

let CreateSubscriptionService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('SubscriptionsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ISubscriptionsRepository.default === "undefined" ? Object : _ISubscriptionsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateSubscriptionService {
  constructor(subscriptionsRepository) {
    this.subscriptionsRepository = subscriptionsRepository;
  }

  async execute({
    title,
    value
  }) {
    if (!title) {
      throw new _AppError.default(400, 'Título do plano não deve ser vazio');
    }

    if (value < 0) {
      throw new _AppError.default(400, 'Valor do plano não deve ser vazio.');
    }

    const subscription = await this.subscriptionsRepository.create({
      title,
      value
    });
    return subscription;
  }

}) || _class) || _class) || _class) || _class);
var _default = CreateSubscriptionService;
exports.default = _default;