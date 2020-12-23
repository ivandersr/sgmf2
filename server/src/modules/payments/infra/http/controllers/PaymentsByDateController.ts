import FindPaymentsByDateService from '@modules/payments/services/FindPaymentsByDateService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class PaymentsByDateController {
  public async find(request: Request, response: Response): Promise<Response> {
    const { paymentDate } = request.body;

    const findByDate = container.resolve(FindPaymentsByDateService);

    const payments = await findByDate.execute({
      paymentDate,
    });

    return response.status(200).json(payments);
  }
}

export default PaymentsByDateController;
