"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _ISubscriptionsRepository = _interopRequireDefault(require("../../subscriptions/repositories/ISubscriptionsRepository"));

var _IAthletesRepository = _interopRequireDefault(require("../repositories/IAthletesRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateAthleteSubscriptionService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AthletesRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('SubscriptionsRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IAthletesRepository.default === "undefined" ? Object : _IAthletesRepository.default, typeof _ISubscriptionsRepository.default === "undefined" ? Object : _ISubscriptionsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateAthleteSubscriptionService {
  constructor(athletesRepository, subscriptionsRepository) {
    this.athletesRepository = athletesRepository;
    this.subscriptionsRepository = subscriptionsRepository;
  }

  async execute({
    athlete_id,
    subscription_id
  }) {
    const athlete = await this.athletesRepository.findOne({
      id: athlete_id
    });

    if (!athlete) {
      throw new _AppError.default(404, 'Aluno não encontrado');
    }

    const subscription = await this.subscriptionsRepository.findOne({
      id: subscription_id
    });

    if (!subscription) {
      throw new _AppError.default(404, 'Plano não encontrado');
    }

    athlete.subscription = subscription;
    await this.athletesRepository.save(athlete);
    return athlete;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = UpdateAthleteSubscriptionService;
exports.default = _default;