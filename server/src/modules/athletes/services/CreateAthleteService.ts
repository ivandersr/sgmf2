import { getRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Subscription from '@modules/subscriptions/infra/typeorm/entities/Subscription';
import AthleteGroup from '@modules/athletegroups/infra/typeorm/entities/AthleteGroup';
import Athlete from '../infra/typeorm/entities/Athlete';

interface IRequest {
  name: string;
  birthDate: Date;
  phoneNumber: string;
  subscription_id: string;
  athlete_group_id: string;
  referral_group_id?: string;
}

class CreateAthleteService {
  public async execute({
    name,
    birthDate,
    phoneNumber,
    subscription_id,
    athlete_group_id,
  }: IRequest): Promise<Athlete> {
    if (!name) {
      throw new AppError(400, 'Nome não pode estar vazio (name).');
    }

    if (!birthDate) {
      throw new AppError(
        400,
        'Data de nascimento não pode estar vazia (birthDate).',
      );
    }

    if (!subscription_id) {
      throw new AppError(
        400,
        'Por favor, indique o plano desejado (subscription_id).',
      );
    }

    if (!athlete_group_id) {
      throw new AppError(
        400,
        'Indique a qual grupo o aluno pertence (athlete_group_id).',
      );
    }

    const athletesRepository = getRepository(Athlete);
    const subscriptionsRepository = getRepository(Subscription);
    const athleteGroupsRepository = getRepository(AthleteGroup);

    const subscription = await subscriptionsRepository.findOne(subscription_id);
    const athleteGroup = await athleteGroupsRepository.findOne(
      athlete_group_id,
    );

    const athlete = athletesRepository.create({
      name,
      birthDate,
      phoneNumber,
      subscription,
      athleteGroup,
    });

    await athletesRepository.save(athlete);

    return athlete;
  }
}

export default CreateAthleteService;
