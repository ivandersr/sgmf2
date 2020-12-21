import { getRepository } from 'typeorm';
import IListAthletesByReferralGroupDTO from '../dtos/IListAthletesByReferralGroupDTO';

import Athlete from '../infra/typeorm/entities/Athlete';

class ListAthletesByReferralGroupService {
  public async execute({
    referral_group_id,
  }: IListAthletesByReferralGroupDTO): Promise<Athlete[]> {
    const athletesRepository = getRepository(Athlete);

    const athletes = await athletesRepository.find({
      where: { referral_group_id },
    });

    return athletes;
  }
}

export default ListAthletesByReferralGroupService;
