import { Router } from 'express';
import SubscriptionsRepository from '../repositories/SubscriptionsRepository';

const subscriptionsRouter = Router();
const subscriptionsRepository = new SubscriptionsRepository();

subscriptionsRouter.get('/', (request, response) => {
  const subscriptions = subscriptionsRepository.all();
  return response.json(subscriptions);
});

subscriptionsRouter.post('/', (request, response) => {
  const { title, value } = request.body;

  const subscription = subscriptionsRepository.create(title, value);

  return response.status(201).json(subscription);
})

export default subscriptionsRouter;
