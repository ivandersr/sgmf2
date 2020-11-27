import { Router } from 'express';
import { getRepository } from 'typeorm';
import Subscription from '@modules/subscriptions/infra/typeorm/entities/Subscription';
import CreateSubscriptionService from '@modules/subscriptions/services/CreateSubscriptionService';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const subscriptionsRouter = Router();

subscriptionsRouter.use(ensureAuthenticated);

subscriptionsRouter.get('/', async (request, response) => {
  const subscriptionsRepository = getRepository(Subscription);
  const subscriptions = await subscriptionsRepository.find();
  return response.status(200).json(subscriptions);
});

subscriptionsRouter.post('/', async (request, response) => {
  try {
    const { title, value } = request.body;

    const createSubscriptionService = new CreateSubscriptionService();

    const subscription = await createSubscriptionService.execute({
      title,
      value,
    });

    return response.status(201).json(subscription);
  } catch (err) {
    return response.status(400).json({
      error: err.message,
    });
  }
});

export default subscriptionsRouter;
