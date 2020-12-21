import Athlete from '@modules/athletes/infra/typeorm/entities/Athlete';
import AppError from '@shared/errors/AppError';
import { getCustomRepository, getRepository } from 'typeorm';
import IFindByAthleteDTO from '../dtos/IFindByAthleteDTO';
import Payment from '../infra/typeorm/entities/Payment';
import PaymentsRepository from '../infra/typeorm/repositories/PaymentsRepository';

class FindPaymentsByAthleteService {
  public async execute({ athlete_id }: IFindByAthleteDTO): Promise<Payment[]> {
    const athletesRepository = getRepository(Athlete);

    const athlete = await athletesRepository.findOne(athlete_id);

    if (!athlete) {
      throw new AppError(404, 'Aluno não encontrado');
    }

    const paymentsRepository = getCustomRepository(PaymentsRepository);

    const payments = await paymentsRepository.findByAthlete(athlete_id);

    return payments;
  }
}

export default FindPaymentsByAthleteService;
