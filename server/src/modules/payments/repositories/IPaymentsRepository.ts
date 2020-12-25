import ICreatePaymentDTO from '../dtos/ICreatePaymentDTO';
import IFindByAthleteDTO from '../dtos/IFindByAthleteDTO';
import IFindByDateAndAthleteDTO from '../dtos/IFindByDateAndAthleteDTO';
import Payment from '../infra/typeorm/entities/Payment';

export default interface IPaymentsRepository {
  findByDate(paymentDate: Date): Promise<Payment[]>;
  findByDateAndAthlete(data: IFindByDateAndAthleteDTO): Promise<Payment[]>;
  findByAthlete(data: IFindByAthleteDTO): Promise<Payment[]>;
  create(data: ICreatePaymentDTO): Promise<Payment>;
  save(data: Payment): Promise<Payment>;
}
