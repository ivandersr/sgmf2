import { inject, injectable } from 'tsyringe';
import { parseISO, startOfDay } from 'date-fns';
import IFindByDateDTO from '../dtos/IFindByDateDTO';
import IPaymentsRepository from '../repositories/IPaymentsRepository';
import Payment from '../infra/typeorm/entities/Payment';

@injectable()
class FindPaymentsByDateService {
  constructor(
    @inject('PaymentsRepository')
    private paymentsRepository: IPaymentsRepository,
  ) { }

  public async execute({ paymentDate }: IFindByDateDTO): Promise<Payment[]> {
    const parsedDate = parseISO(paymentDate);

    const payments = await this.paymentsRepository.findByDate(
      startOfDay(parsedDate)
    );

    return payments;
  }
}

export default FindPaymentsByDateService;
