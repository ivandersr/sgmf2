import Athlete from '../models/Athlete';

interface CreateAthleteDTO {
  name: string;
  birthDate: Date;
}

class AthletesRepository {
  private athletes: Athlete[];

  constructor() {
    this.athletes = [];
  }

  public create({ name, birthDate }: CreateAthleteDTO): Athlete {
    const athlete = new Athlete({ name, birthDate });

    this.athletes.push(athlete);
    return athlete;
  }

  public all() {
    return this.athletes;
  }
}

export default AthletesRepository;
