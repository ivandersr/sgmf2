"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CreatePaymentService = _interopRequireDefault(require("../../../services/CreatePaymentService"));

var _FindPaymentsByAthleteService = _interopRequireDefault(require("../../../services/FindPaymentsByAthleteService"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PaymentsController {
  async create(request, response) {
    const {
      value,
      paymentDate,
      monthsPaid,
      athlete_id
    } = request.body;

    const createPayment = _tsyringe.container.resolve(_CreatePaymentService.default);

    const payment = await createPayment.execute({
      value,
      paymentDate,
      monthsPaid,
      athlete_id
    });
    return response.status(201).json(payment);
  }

  async find(request, response) {
    const {
      athlete_id
    } = request.body;

    const findByAthlete = _tsyringe.container.resolve(_FindPaymentsByAthleteService.default);

    const payments = await findByAthlete.execute({
      athlete_id
    });
    return response.status(200).json(payments);
  }

}

var _default = PaymentsController;
exports.default = _default;