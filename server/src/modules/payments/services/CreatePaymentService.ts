import { getRepository } from 'typeorm';
import { parseISO } from 'date-fns';
import AppError from '@shared/errors/AppError';
import Athlete from '@modules/athletes/infra/typeorm/entities/Athlete';
import Payment from '../infra/typeorm/entities/Payment';

interface IRequest {
  value: number;
  paymentDate: string;
  monthsPaid: number;
  athlete_id: string;
}

class CreatePaymentService {
  public async execute({
    value,
    paymentDate,
    monthsPaid,
    athlete_id,
  }: IRequest): Promise<Payment> {
    if (!value) {
      throw new AppError(400, 'Valor do pagamento não deve ser vazio');
    }

    if (!paymentDate) {
      throw new AppError(400, 'Data do pagamento não deve ser vazia');
    }

    if (!monthsPaid) {
      throw new AppError(400, 'Quantidade de meses pagos deve ser informada');
    }

    if (!athlete_id) {
      throw new AppError(400, 'O aluno deve ser indicado no pagamento');
    }

    const paymentsRepository = getRepository(Payment);
    const athletesRepository = getRepository(Athlete);

    const athlete = await athletesRepository.findOne(athlete_id);

    if (!athlete) {
      throw new AppError(404, 'Aluno não encontrado');
    }

    const parsedPaymentDate = parseISO(paymentDate);

    const nextDueDate = new Date(parsedPaymentDate);
    nextDueDate.setMonth(nextDueDate.getMonth() + monthsPaid);

    const payment = paymentsRepository.create({
      value,
      paymentDate: parsedPaymentDate,
      monthsPaid,
      nextDueDate,
      athlete,
    });

    await paymentsRepository.save(payment);

    return payment;
  }
}

export default CreatePaymentService;
