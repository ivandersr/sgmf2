import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import AthleteGroup from '../models/AthleteGroup';

interface IRequest {
  title: string;
  description: string;
}

class CreateAthleteGroupService {
  public async execute({
    title,
    description,
  }: IRequest): Promise<AthleteGroup> {
    if (!title) {
      throw new AppError(400, 'Título do grupo deve ser preenchido');
    }

    if (!description) {
      throw new AppError(400, 'Descrição do grupo deve ser preenchida.');
    }

    const athleteGroupsRepository = getRepository(AthleteGroup);

    const athleteGroup = athleteGroupsRepository.create({
      title,
      description,
    });

    await athleteGroupsRepository.save(athleteGroup);

    return athleteGroup;
  }
}

export default CreateAthleteGroupService;
