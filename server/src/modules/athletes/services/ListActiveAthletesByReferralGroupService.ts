import { inject, injectable } from 'tsyringe';
import IActiveByReferralDTO from '../dtos/IActiveByReferralDTO';
import IListAthletesByReferralGroupDTO from '../dtos/IListAthletesByReferralGroupDTO';
import IAthletesRepository from '../repositories/IAthletesRepository';

@injectable()
class ListActiveAthletesByReferralGroupService {
  constructor(
    @inject('AthletesRepository')
    private athletesRepository: IAthletesRepository,
  ) { }

  public async execute({
    referral_group_id,
  }: IListAthletesByReferralGroupDTO): Promise<IActiveByReferralDTO> {
    const athletesList = await this.athletesRepository
      .findActiveByReferralGroup(
        referral_group_id,
      );

    return athletesList;
  }
}

export default ListActiveAthletesByReferralGroupService;
