import FindPaymentsByDateAndAthleteService from '@modules/payments/services/FindPaymentsByDateAndAthleteService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class PaymentsByDateAndAthleteController {
  public async find(request: Request, response: Response): Promise<Response> {
    const { paymentDate, athlete_id } = request.body;

    const findByDateAndAthlete = container.resolve(
      FindPaymentsByDateAndAthleteService
    );

    const payments = await findByDateAndAthlete.execute({
      paymentDate,
      athlete_id,
    });

    return response.status(200).json(payments);
  }
}

export default PaymentsByDateAndAthleteController;
