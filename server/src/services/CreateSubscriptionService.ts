import AppError from '../errors/AppError';
import Subscription from '../models/Subscription';
import SubscriptionsRepository from '../repositories/SubscriptionsRepository';

interface Request {
  title: string;
  value: number;
}

class CreateSubscriptionService {
  private subscriptionsRepository: SubscriptionsRepository;

  constructor(subscriptionsRepository: SubscriptionsRepository) {
    this.subscriptionsRepository = subscriptionsRepository;
  }

  public execute({ title, value }: Request): Subscription {
    if (!title) {
      throw new AppError(400, 'Título do plano não deve ser vazio');
    }

    if (!value) {
      throw new AppError(400, 'Valor do plano não deve ser vazio.');
    }

    const subscription = this.subscriptionsRepository.create({
      title,
      value,
    });

    return subscription;
  }
}

export default CreateSubscriptionService;
