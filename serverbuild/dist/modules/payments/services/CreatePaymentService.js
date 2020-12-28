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

let CreatePaymentService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AthletesRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('PaymentsRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IAthletesRepository.default === "undefined" ? Object : _IAthletesRepository.default, typeof _IPaymentsRepository.default === "undefined" ? Object : _IPaymentsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreatePaymentService {
  constructor(athletesRepository, paymentsRepository) {
    this.athletesRepository = athletesRepository;
    this.paymentsRepository = paymentsRepository;
  }

  async execute({
    value,
    paymentDate,
    monthsPaid,
    athlete_id
  }) {
    if (!value) {
      throw new _AppError.default(400, 'Valor do pagamento não deve ser vazio');
    }

    if (!paymentDate) {
      throw new _AppError.default(400, 'Data do pagamento não deve ser vazia');
    }

    if (!monthsPaid) {
      throw new _AppError.default(400, 'Quantidade de meses pagos deve ser informada');
    }

    if (!athlete_id) {
      throw new _AppError.default(400, 'O aluno deve ser indicado no pagamento');
    }

    const athlete = await this.athletesRepository.findOne({
      id: athlete_id
    });

    if (!athlete) {
      throw new _AppError.default(404, 'Aluno não encontrado');
    }

    const parsedPaymentDate = (0, _dateFns.parseISO)(paymentDate);
    const nextDueDate = new Date(paymentDate);
    nextDueDate.setMonth(nextDueDate.getMonth() + monthsPaid);
    const payment = await this.paymentsRepository.create({
      value,
      paymentDate: (0, _dateFns.startOfDay)(parsedPaymentDate),
      monthsPaid,
      nextDueDate,
      athlete
    });
    return payment;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = CreatePaymentService;
exports.default = _default;