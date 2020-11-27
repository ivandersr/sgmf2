import { getRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Athlete from '@modules/athletes/infra/typeorm/entities/Athlete';
import ReferralGroup from '../infra/typeorm/entities/ReferralGroup';

interface IRequest {
  referral_id: string;
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

    await referralGroupsRepository.save(referralGroup);

    return referralGroup;
  }
}

export default CreateReferralGroupService;