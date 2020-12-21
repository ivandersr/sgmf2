import ReferralGroup from '@modules/referralgroups/infra/typeorm/entities/ReferralGroup';
import AppError from '@shared/errors/AppError';
import { getRepository } from 'typeorm';
import IUpdateAthleteRefGroupDTO from '../dtos/IUpdateAthleteRefGroupDTO';
import Athlete from '../infra/typeorm/entities/Athlete';

class UpdateAthleteReferralGroupService {
  public async execute({
    id,
    referralGroupId,
  }: IUpdateAthleteRefGroupDTO): Promise<Athlete> {
    const athletesRepository = getRepository(Athlete);
    const referralGroupsRepository = getRepository(ReferralGroup);

    const athlete = await athletesRepository.findOne(id);

    if (!athlete) {
      throw new AppError(404, 'Aluno não encontrado');
    }

    const referralGroup = referralGroupsRepository.findOne(referralGroupId);

    if (!referralGroup) {
      throw new AppError(404, 'Grupo de indicações não encontrado');
    }

    athlete.referral_group_id = referralGroupId;

    await athletesRepository.save(athlete);

    return athlete;
  }
}

export default UpdateAthleteReferralGroupService;
