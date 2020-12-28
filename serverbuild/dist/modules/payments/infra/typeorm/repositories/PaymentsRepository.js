"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Payment = _interopRequireDefault(require("../entities/Payment"));

var _dec, _dec2, _dec3, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let PaymentsRepository = (_dec = (0, _typeorm.EntityRepository)(_Payment.default), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = (_temp = class PaymentsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Payment.default);
  }

  async findByDate(paymentDate) {
    const findPayment = await this.ormRepository.find({
      where: {
        paymentDate
      }
    });
    return findPayment;
  }

  async findByDateAndAthlete({
    paymentDate,
    athlete_id
  }) {
    const findPayment = await this.ormRepository.find({
      where: {
        paymentDate,
        athlete_id
      }
    });
    return findPayment;
  }

  async findByAthlete({
    athlete_id
  }) {
    const findPayment = await this.ormRepository.find({
      where: {
        athlete_id
      }
    });
    return findPayment;
  }

  async create(data) {
    const payment = this.ormRepository.create(data);
    await this.ormRepository.save(payment);
    return payment;
  }

  async save(data) {
    await this.ormRepository.save(data);
    return data;
  }

}, _temp)) || _class) || _class) || _class);
var _default = PaymentsRepository;
exports.default = _default;