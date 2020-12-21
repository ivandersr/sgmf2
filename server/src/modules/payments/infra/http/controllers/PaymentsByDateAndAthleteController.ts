import FindPaymentsByDateAndAthleteService from '@modules/payments/services/FindPaymentsByDateAndAthleteService';
import { Request, Response } from 'express';

class PaymentsByDateAndAthleteController {
  public async find(request: Request, response: Response): Promise<Response> {
    const { paymentDate, athlete_id } = request.body;

    const findByDateAndAthlete = new FindPaymentsByDateAndAthleteService();

    const payments = await findByDateAndAthlete.execute({
      paymentDate,
      athlete_id,
    });

    return response.status(200).json(payments);
  }
}

export default PaymentsByDateAndAthleteController;
