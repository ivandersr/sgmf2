import { getRepository } from 'typeorm';
import AthleteGroup from '@modules/athletegroups/infra/typeorm/entities/AthleteGroup';
import AppError from '@shared/errors/AppError';
import Athlete from '../infra/typeorm/entities/Athlete';
import IUpdateAthleteGroupDTO from '../dtos/IUpdateAthleteGroupDTO';

class UpdateAthleteAthleteGroupService {
  public async execute({
    athlete_id,
    athlete_group_id,
  }: IUpdateAthleteGroupDTO): Promise<Athlete> {
    const athletesRepository = getRepository(Athlete);
    const athleteGroupsRepository = getRepository(AthleteGroup);

    const athlete = await athletesRepository.findOne(athlete_id);

    if (!athlete) {
      throw new AppError(404, 'Aluno não encontrado');
    }

    const athleteGroup = await athleteGroupsRepository.findOne(
      athlete_group_id,
    );

    if (!athleteGroup) {
      throw new AppError(404, 'Grupo não encontrada');
    }

    athlete.athleteGroup = athleteGroup;

    await athletesRepository.save(athlete);

    return athlete;
  }
}

export default UpdateAthleteAthleteGroupService;
