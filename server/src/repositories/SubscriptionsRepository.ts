import Subscription from '../models/Subscription';

interface CreateSubscriptionDTO {
  title: string;
  value: number;
}

class SubscriptionsRepository {
  private subscriptions: Subscription[];

  constructor() {
    this.subscriptions = [];
  }

  public create({ title, value }: CreateSubscriptionDTO): Subscription {
    const subscription = new Subscription({ title, value });
    this.subscriptions.push(subscription);
    return subscription;
  }

  public all() {
    return this.subscriptions;
  }
}

export default SubscriptionsRepository;
