import ICreatePaymentDTO from '../dtos/ICreatePaymentDTO';
import Payment from '../infra/typeorm/entities/Payment';

export default interface IPaymentsRepository {
  findByDate(paymentDate: Date): Promise<Payment[]>;
  findByDateAndAthlete(
    paymentDate: Date,
    athlete_id: string,
  ): Promise<Payment[]>;
  findByAthlete(athlete_id: string): Promise<Payment[]>;
  create(data: ICreatePaymentDTO): Promise<Payment>;
  save(data: Payment): Promise<Payment>;
}
