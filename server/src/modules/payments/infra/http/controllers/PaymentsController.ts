import CreatePaymentService from '@modules/payments/services/CreatePaymentService';
import FindPaymentsByAthleteService from '@modules/payments/services/FindPaymentsByAthleteService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class PaymentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { value, paymentDate, monthsPaid, athlete_id } = request.body;

    const createPayment = container.resolve(CreatePaymentService);

    const payment = await createPayment.execute({
      value,
      paymentDate,
      monthsPaid,
      athlete_id,
    });

    return response.status(201).json(payment);
  }

  public async find(request: Request, response: Response): Promise<Response> {
    const { athlete_id } = request.body;

    const findByAthlete = container.resolve(FindPaymentsByAthleteService);

    const payments = await findByAthlete.execute({
      athlete_id,
    });

    return response.status(200).json(payments);
  }
}

export default PaymentsController;
