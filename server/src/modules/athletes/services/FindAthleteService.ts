import AppError from '@shared/errors/AppError';
import { getRepository } from 'typeorm';
import IFindAthleteDTO from '../dtos/IFindAthleteDTO';
import Athlete from '../infra/typeorm/entities/Athlete';

class FindAthleteService {
  public async execute({ id }: IFindAthleteDTO): Promise<Athlete> {
    const athletesRepository = getRepository(Athlete);

    const athlete = await athletesRepository.findOne(id);

    if (!athlete) {
      throw new AppError(404, 'Aluno não encontrado');
    }

    return athlete;
  }
}

export default FindAthleteService;
