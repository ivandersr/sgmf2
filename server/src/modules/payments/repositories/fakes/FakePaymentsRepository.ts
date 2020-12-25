import { v4 } from 'uuid';
import { isEqual } from 'date-fns';
import IFindByDateAndAthleteDTO from '@modules/payments/dtos/IFindByDateAndAthleteDTO';
import IFindByAthleteDTO from '@modules/payments/dtos/IFindByAthleteDTO';
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

  public async findByAthlete(
    { athlete_id }: IFindByAthleteDTO
  ): Promise<Payment[]> {
    const findPayments = this.payments.filter(
      payment => payment.athlete_id === athlete_id
    );

    return findPayments;
  }

  public async findByDateAndAthlete(
    { paymentDate, athlete_id }: IFindByDateAndAthleteDTO
  ): Promise<Payment[]> {
    const findPayments = this.payments.filter(
      payment =>
        payment.athlete_id === athlete_id && isEqual(
          payment.paymentDate, paymentDate
        ),
    );

    return findPayments;
  }

  public async create({
    athlete,
    monthsPaid,
    paymentDate,
    nextDueDate,
    value,
  }: ICreatePaymentDTO): Promise<Payment> {
    const payment = new Payment();
    Object.assign(payment, {
      id: v4(),
      athlete,
      monthsPaid,
      paymentDate,
      nextDueDate,
      value,
    });

    return payment;
  }

  public async save(data: Payment): Promise<Payment> {
    const paymentIndex = this.payments.findIndex(
      payment => payment.id === data.id
    );

    if (paymentIndex === -1) {
      this.payments.push(data);
      return data;
    }

    this.payments[paymentIndex] = data;
    return data;
  }
}

export default FakePaymentsRepository;
