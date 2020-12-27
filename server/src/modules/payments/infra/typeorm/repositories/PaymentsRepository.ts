import { EntityRepository, getRepository, Repository } from 'typeorm';
import IPaymentsRepository from '@modules/payments/repositories/IPaymentsRepository';
import ICreatePaymentDTO from '@modules/payments/dtos/ICreatePaymentDTO';
import IFindByDateAndAthleteDTO from '@modules/payments/dtos/IFindByDateAndAthleteDTO';
import IFindByAthleteDTO from '@modules/payments/dtos/IFindByAthleteDTO';
import Payment from '../entities/Payment';

@EntityRepository(Payment)
class PaymentsRepository
  implements IPaymentsRepository {
  private ormRepository: Repository<Payment>;

  constructor() {
    this.ormRepository = getRepository(Payment);
  }

  public async findByDate(paymentDate: Date): Promise<Payment[]> {
    const findPayment = await this.ormRepository.find({
      where: { paymentDate },
    });

    return findPayment;
  }

  public async findByDateAndAthlete(
    { paymentDate, athlete_id }: IFindByDateAndAthleteDTO
  ): Promise<Payment[]> {
    const findPayment = await this.ormRepository.find({
      where: { paymentDate, athlete_id },
    });

    return findPayment;
  }

  public async findByAthlete(
    { athlete_id }: IFindByAthleteDTO
  ): Promise<Payment[]> {
    const findPayment = await this.ormRepository.find({
      where: { athlete_id },
    });

    return findPayment;
  }

  public async create(data: ICreatePaymentDTO): Promise<Payment> {
    const payment = this.ormRepository.create(data);

    await this.ormRepository.save(payment);

    return payment;
  }

  public async save(data: Payment): Promise<Payment> {
    await this.ormRepository.save(data);

    return data;
  }
}

export default PaymentsRepository;
