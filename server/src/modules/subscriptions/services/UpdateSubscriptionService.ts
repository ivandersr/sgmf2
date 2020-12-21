import AppError from '@shared/errors/AppError';
import { getRepository } from 'typeorm';
import IUpdateSubscriptionDTO from '../dtos/IUpdateSubscriptionDTO';
import Subscription from '../infra/typeorm/entities/Subscription';

class UpdateSubscriptionService {
  public async execute({
    id,
    title,
    value,
  }: IUpdateSubscriptionDTO): Promise<Subscription> {
    const subscriptionsRepository = getRepository(Subscription);

    const subscription = await subscriptionsRepository.findOne(id);

    if (!subscription) {
      throw new AppError(404, 'Plano não encontrado');
    }

    Object.assign(subscription, { title, value });

    await subscriptionsRepository.save(subscription);

    return subscription;
  }
}

export default UpdateSubscriptionService;
