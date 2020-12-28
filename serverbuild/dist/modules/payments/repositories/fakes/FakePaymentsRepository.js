"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

var _dateFns = require("date-fns");

var _Payment = _interopRequireDefault(require("../../infra/typeorm/entities/Payment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakePaymentsRepository {
  constructor() {
    this.payments = [];
  }

  async findByDate(date) {
    const findPayments = this.payments.filter(payment => (0, _dateFns.isEqual)(payment.paymentDate, date));
    return findPayments;
  }

  async findByAthlete({
    athlete_id
  }) {
    const findPayments = this.payments.filter(payment => payment.athlete.id === athlete_id);
    return findPayments;
  }

  async findByDateAndAthlete({
    paymentDate,
    athlete_id
  }) {
    const findPayments = this.payments.filter(payment => payment.athlete.id === athlete_id && (0, _dateFns.isEqual)(payment.paymentDate, paymentDate));
    return findPayments;
  }

  async create({
    athlete,
    monthsPaid,
    paymentDate,
    nextDueDate,
    value
  }) {
    const payment = new _Payment.default();
    Object.assign(payment, {
      id: (0, _uuid.v4)(),
      athlete,
      monthsPaid,
      paymentDate,
      nextDueDate,
      value
    });
    this.payments.push(payment);
    return payment;
  }

  async save(data) {
    const paymentIndex = this.payments.findIndex(payment => payment.id === data.id);

    if (paymentIndex === -1) {
      this.payments.push(data);
      return data;
    }

    this.payments[paymentIndex] = data;
    return data;
  }

}

var _default = FakePaymentsRepository;
exports.default = _default;