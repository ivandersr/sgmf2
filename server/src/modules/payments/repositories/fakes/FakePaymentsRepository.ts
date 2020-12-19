import { v4 } from 'uuid';

import { isEqual } from 'date-fns';
import IPaymentsRepository from '../IPaymentsRepository';
import ICreatePaymentDTO from '../../dtos/ICreatePaymentDTO';
import Payment from '../../infra/typeorm/entities/Payment';

class FakePaymentsRepository implements IPaymentsRepository {
  private payments: Payment[] = [];

  public async findByDate(date: Date): Promise<Payment[]> {
    const findPayments = this.payments.filter(payment =>
      isEqual(payment.paymentDate, date),
    );

    return findPayments;
  }

  public async findByDateAndAthlete(
    date: Date,
    athlete_id: string,
  ): Promise<Payment | undefined> {
    const findPayments = this.payments.find(
      payment =>
        payment.athlete_id === athlete_id && isEqual(payment.paymentDate, date),
    );

    return findPayments;
  }

  public async create({
    athlete_id,
    monthsPaid,
    paymentDate,
    value,
  }: ICreatePaymentDTO): Promise<Payment> {
    const payment = new Payment();
    Object.assign(payment, {
      id: v4(),
      athlete_id,
      monthsPaid,
      paymentDate,
      value,
    });

    return payment;
  }
}

export default FakePaymentsRepository;
