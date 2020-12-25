import { Repository, getRepository } from 'typeorm';
import IActiveByReferralDTO from '@modules/athletes/dtos/IActiveByReferralDTO';
import ICreateAthleteDTO from '@modules/athletes/dtos/ICreateAthleteDTO';
import IFindManyOptionsDTO from '@modules/athletes/dtos/IFindManyOptionsDTO';
import IAthletesRepository from '@modules/athletes/repositories/IAthletesRepository';
import IFindAthleteDTO from '@modules/athletes/dtos/IFindAthleteDTO';
import IFindByReferralGroupDTO from '@modules/athletes/dtos/IFindByReferralGroupDTO';
import Athlete from '../entities/Athlete';

class AthletesRepository implements IAthletesRepository {
  private ormRepository: Repository<Athlete>;

  constructor() {
    this.ormRepository = getRepository(Athlete)
  }

  public async findAndCount(
    options?: IFindManyOptionsDTO
  ): Promise<[Athlete[], number]> {
    const result = await this.ormRepository.findAndCount(options);

    return result;
  }

  public async findOne(data: IFindAthleteDTO): Promise<Athlete | undefined> {
    const athlete = await this.ormRepository.findOne(data);

    return athlete;
  }

  public async create(data: ICreateAthleteDTO): Promise<Athlete> {
    const athlete = this.ormRepository.create(data);

    await this.ormRepository.save(athlete);

    return athlete;
  }

  public async save(data: Athlete): Promise<Athlete> {
    await this.ormRepository.save(data);

    return data;
  }

  public async findByReferralGroup(
    { referral_group_id }: IFindByReferralGroupDTO
  ): Promise<Athlete[]> {
    const athletes = await this.ormRepository.find({
      where: { referral_group_id },
    });

    return athletes;
  }

  public async findActiveByReferralGroup(
    { referral_group_id }: IFindByReferralGroupDTO
  ): Promise<IActiveByReferralDTO> {
    const athletes = await this.ormRepository.find({
      where: { referral_group_id, active: true },
    });

    const count = athletes.length;

    return { athletes, count };
  }

}

export default AthletesRepository;
