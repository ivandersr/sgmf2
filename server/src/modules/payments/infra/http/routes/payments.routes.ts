import { Router } from 'express';
import CreatePaymentService from '@modules/payments/services/CreatePaymentService';

const paymentsRouter = Router();

paymentsRouter.post('/', async (request, response) => {
  const { value, paymentDate, monthsPaid, athlete_id } = request.body;

  const createPayment = new CreatePaymentService();

  const payment = await createPayment.execute({
    value,
    paymentDate,
    monthsPaid,
    athlete_id,
  });

  return response.status(201).json(payment);
});

export default paymentsRouter;
