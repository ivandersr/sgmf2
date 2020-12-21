import { getRepository, Repository } from 'typeorm';
import ICreateAthleteGroupDTO from '@modules/athletegroups/dtos/ICreateAthleteGroupDTO';
import IAthleteGroupsRepository from '@modules/athletegroups/repositories/IAthleteGroupsRepository';
import AthleteGroup from '../entities/AthleteGroup';

class AthleteGroupsRepository implements IAthleteGroupsRepository {
  private ormRepository: Repository<AthleteGroup>;

  constructor() {
    this.ormRepository = getRepository(AthleteGroup);
  }

  public async find(): Promise<AthleteGroup[]> {
    const athleteGroups = await this.ormRepository.find();

    return athleteGroups;
  }

  public async create({
    title,
    description,
  }: ICreateAthleteGroupDTO): Promise<AthleteGroup> {
    const athleteGroup = this.ormRepository.create({
      title,
      description,
    });

    await this.ormRepository.save(athleteGroup);

    return athleteGroup;
  }
}

export default AthleteGroupsRepository;
