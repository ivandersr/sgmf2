import { getRepository } from 'typeorm';

import Athlete from '../infra/typeorm/entities/Athlete';

interface IRequest {
  referralGroupId: string;
}

class ListAthletesByReferralGroupService {
  public async execute({ referralGroupId }: IRequest): Promise<Athlete[]> {
    const athletesRepository = getRepository(Athlete);

    const athletes = await athletesRepository.find({
      where: { referral_group_id: referralGroupId },
    });

    return athletes;
  }
}

export default ListAthletesByReferralGroupService;
