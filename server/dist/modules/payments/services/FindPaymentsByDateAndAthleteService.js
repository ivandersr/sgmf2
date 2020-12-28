"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _dateFns = require("date-fns");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IAthletesRepository = _interopRequireDefault(require("../../athletes/repositories/IAthletesRepository"));

var _IPaymentsRepository = _interopRequireDefault(require("../repositories/IPaymentsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let FindPaymentsByDateAndAthleteService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AthletesRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('PaymentsRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IAthletesRepository.default === "undefined" ? Object : _IAthletesRepository.default, typeof _IPaymentsRepository.default === "undefined" ? Object : _IPaymentsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class FindPaymentsByDateAndAthleteService {
  constructor(athletesRepository, paymentsRepository) {
    this.athletesRepository = athletesRepository;
    this.paymentsRepository = paymentsRepository;
  }

  async execute({
    paymentDate,
    athlete_id
  }) {
    const athlete = await this.athletesRepository.findOne({
      id: athlete_id
    });

    if (!athlete) {
      throw new _AppError.default(404, 'Aluno não encontrado');
    }

    const parsedDate = (0, _dateFns.parseISO)(paymentDate);
    const payments = await this.paymentsRepository.findByDateAndAthlete({
      paymentDate: (0, _dateFns.startOfDay)(parsedDate),
      athlete_id
    });
    return payments;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = FindPaymentsByDateAndAthleteService;
exports.default = _default;