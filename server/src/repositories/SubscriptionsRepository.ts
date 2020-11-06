import Subscription from '../models/Subscription';

class SubscriptionsRepository {
  private subscriptions: Subscription[];

  constructor() {
    this.subscriptions = [];
  }

  public create(title: string, value: number) {
    const subscription = new Subscription({ title, value });
    this.subscriptions.push(subscription);
    return subscription;
  }

  public all() {
    return this.subscriptions;
  }
}

export default SubscriptionsRepository;
