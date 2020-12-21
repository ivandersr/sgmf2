import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import IFindByDateDTO from '../dtos/IFindByDateDTO';
import Payment from '../infra/typeorm/entities/Payment';
import PaymentsRepository from '../infra/typeorm/repositories/PaymentsRepository';

class FindPaymentsByDateService {
  public async execute({ paymentDate }: IFindByDateDTO): Promise<Payment[]> {
    const paymentsRepository = getCustomRepository(PaymentsRepository);

    const parsedDate = parseISO(paymentDate);

    const payments = await paymentsRepository.findByDate(parsedDate);

    return payments;
  }
}

export default FindPaymentsByDateService;
