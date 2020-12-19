import Subscription from '@modules/subscriptions/infra/typeorm/entities/Subscription';
import AppError from '@shared/errors/AppError';
import { getRepository } from 'typeorm';
import Athlete from '../infra/typeorm/entities/Athlete';

interface IRequest {
  athlete_id: string;
  subscription_id: string;
}

class UpdateAthleteSubscriptionService {
  public async execute({
    athlete_id,
    subscription_id,
  }: IRequest): Promise<Athlete> {
    const athletesRepository = getRepository(Athlete);
    const subscriptionsRepository = getRepository(Subscription);

    const athlete = await athletesRepository.findOne(athlete_id);

    if (!athlete) {
      throw new AppError(404, 'Aluno não encontrado');
    }

    const subscription = await subscriptionsRepository.findOne(subscription_id);

    if (!subscription) {
      throw new AppError(404, 'Plano não encontrado');
    }

    athlete.subscription = subscription;

    await athletesRepository.save(athlete);

    return athlete;
  }
}

export default UpdateAthleteSubscriptionService;
