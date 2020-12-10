import AppError from '@shared/errors/AppError';
import { getRepository } from 'typeorm';
import Athlete from '../infra/typeorm/entities/Athlete';

interface IRequest {
  id: string;
}

class FindAthleteService {
  public async execute({ id }: IRequest): Promise<Athlete> {
    const athletesRepository = getRepository(Athlete);

    const athlete = await athletesRepository.findOne(id);

    if (!athlete) {
      throw new AppError(404, 'Aluno não encontrado');
    }

    return athlete;
  }
}

export default FindAthleteService;
