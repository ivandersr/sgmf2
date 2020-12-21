import IActiveByReferralDTO from '../dtos/IActiveByReferralDTO';
import ICreateAthleteDTO from '../dtos/ICreateAthleteDTO';
import IFindAthleteDTO from '../dtos/IFindAthleteDTO';
import IFindManyOptionsDTO from '../dtos/IFindManyOptionsDTO';
import Athlete from '../infra/typeorm/entities/Athlete';

export default interface IAthletesRepository {
  findByReferralGroup(referral_group_id: string): Promise<Athlete[]>;
  findActiveByReferralGroup(
    referral_group_id: string,
  ): Promise<IActiveByReferralDTO>;
  findAndCount(options?: IFindManyOptionsDTO): Promise<[Athlete[], number]>;
  findOne(data: IFindAthleteDTO): Promise<Athlete | undefined>;
  create(data: ICreateAthleteDTO): Promise<Athlete>;
  save(data: Athlete): Promise<Athlete>;
}
