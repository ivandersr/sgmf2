import { getCustomRepository } from 'typeorm';
import IActiveByReferralDTO from '../dtos/IActiveByReferralDTO';
import IListAthletesByReferralGroupDTO from '../dtos/IListAthletesByReferralGroupDTO';
import AthletesRepository from '../infra/typeorm/repositories/AthletesRepository';

class ListActiveAthletesByReferralGroupService {
  public async execute({
    referral_group_id,
  }: IListAthletesByReferralGroupDTO): Promise<IActiveByReferralDTO> {
    const athletesRepository = getCustomRepository(AthletesRepository);

    const athletesList = await athletesRepository.findActiveByReferralGroup(
      referral_group_id,
    );

    return athletesList;
  }
}

export default ListActiveAthletesByReferralGroupService;
