import AppError from '@shared/errors/AppError';
import { getRepository } from 'typeorm';
import Athlete from '../infra/typeorm/entities/Athlete';

interface IRequest {
  athlete_id: string;
  active: boolean;
}

class UpdateAthleteActiveFieldService {
  public async execute({ athlete_id, active }: IRequest): Promise<Athlete> {
    const athletesRepository = getRepository(Athlete);

    const athlete = await athletesRepository.findOne(athlete_id);

    if (!athlete) {
      throw new AppError(404, 'Aluno não encontrado');
    }

    athlete.active = active;

    await athletesRepository.save(athlete);

    return athlete;
  }
}

export default UpdateAthleteActiveFieldService;
