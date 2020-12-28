"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FindPaymentsByDateAndAthleteService = _interopRequireDefault(require("../../../services/FindPaymentsByDateAndAthleteService"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PaymentsByDateAndAthleteController {
  async find(request, response) {
    const {
      paymentDate,
      athlete_id
    } = request.body;

    const findByDateAndAthlete = _tsyringe.container.resolve(_FindPaymentsByDateAndAthleteService.default);

    const payments = await findByDateAndAthlete.execute({
      paymentDate,
      athlete_id
    });
    return response.status(200).json(payments);
  }

}

var _default = PaymentsByDateAndAthleteController;
exports.default = _default;