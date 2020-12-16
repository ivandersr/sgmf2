import { EntityRepository, Repository } from 'typeorm';
import IPaymentsRepository from '@modules/payments/repositories/IPaymentsRepository';
import Payment from '../entities/Payment';

@EntityRepository(Payment)
class PaymentsRepository
  extends Repository<Payment>
  implements IPaymentsRepository {
  public async findByDate(paymentDate: Date): Promise<Payment | undefined> {
    const findPayment = await this.findOne({
      where: { paymentDate },
    });

    return findPayment;
  }
}

export default PaymentsRepository;
