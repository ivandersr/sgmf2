import Athlete from '@modules/athletes/infra/typeorm/entities/Athlete';
import AppError from '@shared/errors/AppError';
import { parseISO } from 'date-fns';
import { getCustomRepository, getRepository } from 'typeorm';
import IFindByDateAndAthleteDTO from '../dtos/IFindByDateAndAthleteDTO';
import Payment from '../infra/typeorm/entities/Payment';
import PaymentsRepository from '../infra/typeorm/repositories/PaymentsRepository';

class FindPaymentsByDateAndAthleteService {
  public async execute({
    paymentDate,
    athlete_id,
  }: IFindByDateAndAthleteDTO): Promise<Payment[]> {
    const athletesRepository = getRepository(Athlete);

    const athlete = await athletesRepository.findOne(athlete_id);

    if (!athlete) {
      throw new AppError(404, 'Aluno não encontrado');
    }

    const parsedDate = parseISO(paymentDate);

    const paymentsRepository = getCustomRepository(PaymentsRepository);

    const payments = await paymentsRepository.findByDateAndAthlete(
      parsedDate,
      athlete_id,
    );

    return payments;
  }
}

export default FindPaymentsByDateAndAthleteService;
