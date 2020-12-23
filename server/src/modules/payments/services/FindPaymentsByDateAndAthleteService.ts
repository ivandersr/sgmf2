import { inject, injectable } from 'tsyringe';
import { parseISO } from 'date-fns';
import AppError from '@shared/errors/AppError';
import IAthletesRepository from '@modules/athletes/repositories/IAthletesRepository';
import IFindByDateAndAthleteDTO from '../dtos/IFindByDateAndAthleteDTO';
import IPaymentsRepository from '../repositories/IPaymentsRepository';
import Payment from '../infra/typeorm/entities/Payment';

@injectable()
class FindPaymentsByDateAndAthleteService {
  constructor(
    @inject('AthletesRepository')
    private athletesRepository: IAthletesRepository,

    @inject('PaymentsRepository')
    private paymentsRepository: IPaymentsRepository,
  ) { }

  public async execute({
    paymentDate,
    athlete_id,
  }: IFindByDateAndAthleteDTO): Promise<Payment[]> {
    const athlete = await this.athletesRepository.findOne({ id: athlete_id });

    if (!athlete) {
      throw new AppError(404, 'Aluno não encontrado');
    }

    const parsedDate = parseISO(paymentDate);

    const payments = await this.paymentsRepository.findByDateAndAthlete(
      parsedDate,
      athlete_id,
    );

    return payments;
  }
}

export default FindPaymentsByDateAndAthleteService;
