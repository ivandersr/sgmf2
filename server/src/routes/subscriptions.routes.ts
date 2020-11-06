import { Router } from 'express';
import SubscriptionsRepository from '../repositories/SubscriptionsRepository';
import CreateSubscriptionService from '../services/CreateSubscriptionService';

const subscriptionsRouter = Router();
const subscriptionsRepository = new SubscriptionsRepository();
const createSubscriptionService = new CreateSubscriptionService(
  subscriptionsRepository
);

subscriptionsRouter.get('/', (request, response) => {
  const subscriptions = subscriptionsRepository.all();
  return response.json(subscriptions);
});

subscriptionsRouter.post('/', (request, response) => {
  const { title, value } = request.body;

  try {
    const subscription = createSubscriptionService.execute({
      title,
      value,
    });

    return response.status(201).json(subscription);
  } catch (err) {
    return response.status(err.statusCode).json({
      message: err.message,
    })
  }

})

export default subscriptionsRouter;
