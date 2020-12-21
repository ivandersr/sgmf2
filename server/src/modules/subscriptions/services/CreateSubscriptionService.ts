import { getRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Subscription from '../infra/typeorm/entities/Subscription';
import ICreateSubscriptionDTO from '../dtos/ICreateSubscriptionDTO';

class CreateSubscriptionService {
  public async execute({
    title,
    value,
  }: ICreateSubscriptionDTO): Promise<Subscription> {
    if (!title) {
      throw new AppError(400, 'Título do plano não deve ser vazio');
    }

    if (!value) {
      throw new AppError(400, 'Valor do plano não deve ser vazio.');
    }

    const subscriptionsRepository = getRepository(Subscription);

    const subscription = subscriptionsRepository.create({
      title,
      value,
    });

    await subscriptionsRepository.save(subscription);

    return subscription;
  }
}

export default CreateSubscriptionService;
