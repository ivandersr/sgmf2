import { getRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Athlete from '@modules/athletes/infra/typeorm/entities/Athlete';
import ReferralGroup from '../infra/typeorm/entities/ReferralGroup';

interface IRequest {

}

class CreateReferralGroupService {
  public async execute({ referral_id }: IRequest): Promise<ReferralGroup> {
    if (!referral_id) {
      throw new AppError(
        400,
        'O grupo deve ter um(a) aluno(a) de referência (quem indicou).',
      );
    }

    const athletesRepository = getRepository(Athlete);
    const referralGroupsRepository = getRepository(ReferralGroup);

    const athlete = await athletesRepository.findOne(referral_id);

    if (!athlete) {
      throw new AppError(404, 'Aluno(a) não encontrado(a).');
    }

    const { name } = athlete;

    const referralGroup = referralGroupsRepository.create({
      title: name,
      referral: athlete,
    });

    athlete.referralGroup = referralGroup;

    await referralGroupsRepository.save(referralGroup);
    await athletesRepository.save(athlete);

    return referralGroup;
  }
}

export default CreateReferralGroupService;
