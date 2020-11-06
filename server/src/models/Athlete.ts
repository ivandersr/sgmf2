import { v4 } from 'uuid';

class Athlete {
  id: string;

  name: string;

  birthDate: Date;

  constructor({ name, birthDate }: Omit<Athlete, 'id'>) {
    this.id = v4();
    this.name = name;
    this.birthDate = birthDate;
  }
}

export default Athlete;
