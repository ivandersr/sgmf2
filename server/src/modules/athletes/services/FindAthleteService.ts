import { getRepository } from 'typeorm';
import Athlete from '../infra/typeorm/entities/Athlete';

interface IRequest {
  id: string;
}

class FindAthleteService {
  public async execute({ id }: IRequest): Promise<Athlete | undefined> {
    const athletesRepository = getRepository(Athlete);

    const athlete = await athletesRepository.findOne(id);

    return athlete;
  }
}

export default FindAthleteService;
