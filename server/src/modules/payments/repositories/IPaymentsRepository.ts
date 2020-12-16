import Payment from '../infra/typeorm/entities/Payment';

export default interface IPaymentsRepository {
  findByDate(paymentDate: Date): Promise<Payment | undefined>;
}
