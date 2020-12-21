import IActiveByReferralDTO from '../dtos/IActiveByReferralDTO';
import Athlete from '../infra/typeorm/entities/Athlete';

export default interface IAthletesRepository {
  findByReferralGroup(referral_group_id: string): Promise<Athlete[]>;
  findActiveByReferralGroup(
    referral_group_id: string,
  ): Promise<IActiveByReferralDTO>;
}
