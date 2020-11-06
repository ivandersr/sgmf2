import { v4 } from 'uuid';

class Subscription {
  id: string;

  title: string;

  value: number;

  constructor({ title, value }: Omit<Subscription, 'id'>) {
    this.id = v4();
    this.title = title;
    this.value = value;
  }
}

export default Subscription;
