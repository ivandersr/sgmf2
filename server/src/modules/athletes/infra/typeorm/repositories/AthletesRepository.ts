import IActiveByReferralDTO from '@modules/athletes/dtos/IActiveByReferralDTO';
import IAthletesRepository from '@modules/athletes/repositories/IAthletesRepository';
import { EntityRepository, Repository } from 'typeorm';
import Athlete from '../entities/Athlete';

@EntityRepository(Athlete)
class AthletesRepository
  extends Repository<Athlete>
  implements IAthletesRepository {
  public async findByReferralGroup(
    referral_group_id: string,
  ): Promise<Athlete[]> {
    const athletes = await this.find({
      where: { referral_group_id },
    });

    return athletes;
  }

  public async findActiveByReferralGroup(
    referral_group_id: string,
  ): Promise<IActiveByReferralDTO> {
    const athletes = await this.find({
      where: { referral_group_id, active: true },
    });

    const count = athletes.length;

    return { athletes, count };
  }
}

export default AthletesRepository;
