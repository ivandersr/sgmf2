import CreateSubscriptionService from '@modules/subscriptions/services/CreateSubscriptionService';
import ListSubscriptionsService from '@modules/subscriptions/services/ListSubscriptionsService';
import UpdateSubscriptionService from '@modules/subscriptions/services/UpdateSubscriptionService';
import { Request, Response } from 'express';

class SubscriptionsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { page, pageSize } = request.query;

    const listSubscriptions = new ListSubscriptionsService();

    const subscriptions = await listSubscriptions.execute({
      page: String(page),
      pageSize: String(pageSize),
    });

    return response.status(200).json(subscriptions);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, value } = request.body;

    const createSubscription = new CreateSubscriptionService();

    const subscription = await createSubscription.execute({ title, value });

    return response.status(201).json(subscription);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { title, value } = request.body;

    const updateSubscription = new UpdateSubscriptionService();

    const subscription = await updateSubscription.execute({ id, title, value });

    return response.status(200).json(subscription);
  }
}

export default SubscriptionsController;
