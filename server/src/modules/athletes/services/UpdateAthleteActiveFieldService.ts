import AppError from '@shared/errors/AppError';
import { getRepository } from 'typeorm';
import IUpdateAthleteActiveFieldDTO from '../dtos/IUpdateAthleteActiveFieldDTO';
import Athlete from '../infra/typeorm/entities/Athlete';

class UpdateAthleteActiveFieldService {
  public async execute({
    athlete_id,
    active,
  }: IUpdateAthleteActiveFieldDTO): Promise<Athlete> {
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
