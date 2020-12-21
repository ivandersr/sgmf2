import { getCustomRepository } from 'typeorm';
import IActiveByReferralDTO from '../dtos/IActiveByReferralDTO';
import AthletesRepository from '../infra/typeorm/repositories/AthletesRepository';

interface IRequest {
  referral_group_id: string;
}

class ListActiveAthletesByReferralGroupService {
  public async execute({
    referral_group_id,
  }: IRequest): Promise<IActiveByReferralDTO> {
    const athletesRepository = getCustomRepository(AthletesRepository);

    const athletesList = await athletesRepository.findActiveByReferralGroup(
      referral_group_id,
    );

    return athletesList;
  }
}

export default ListActiveAthletesByReferralGroupService;
