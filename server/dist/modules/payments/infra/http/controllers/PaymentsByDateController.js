"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FindPaymentsByDateService = _interopRequireDefault(require("../../../services/FindPaymentsByDateService"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PaymentsByDateController {
  async find(request, response) {
    const {
      paymentDate
    } = request.body;

    const findByDate = _tsyringe.container.resolve(_FindPaymentsByDateService.default);

    const payments = await findByDate.execute({
      paymentDate
    });
    return response.status(200).json(payments);
  }

}

var _default = PaymentsByDateController;
exports.default = _default;