"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _dateFns = require("date-fns");

var _IPaymentsRepository = _interopRequireDefault(require("../repositories/IPaymentsRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let FindPaymentsByDateService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PaymentsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IPaymentsRepository.default === "undefined" ? Object : _IPaymentsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class FindPaymentsByDateService {
  constructor(paymentsRepository) {
    this.paymentsRepository = paymentsRepository;
  }

  async execute({
    paymentDate
  }) {
    const parsedDate = (0, _dateFns.parseISO)(paymentDate);
    const payments = await this.paymentsRepository.findByDate((0, _dateFns.startOfDay)(parsedDate));
    return payments;
  }

}) || _class) || _class) || _class) || _class);
var _default = FindPaymentsByDateService;
exports.default = _default;