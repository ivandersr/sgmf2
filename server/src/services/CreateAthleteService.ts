import AppError from '../errors/AppError';
import Athlete from '../models/Athlete';
import AthletesRepository from '../repositories/AthletesRepository';

interface Request {
  name: string;
  birthDate: Date;
}

class CreateAthleteService {
  private athletesRepository: AthletesRepository;

  constructor(athletesRepository: AthletesRepository) {
    this.athletesRepository = athletesRepository;
  }

  public execute({ name, birthDate }: Request): Athlete {
    if (!name) {
      throw new AppError(400, 'Nome não pode estar vazio.')
    }

    if (!birthDate) {
      throw new AppError(400, 'Data de nascimento não pode estar vazia.')
    }

    const athlete = this.athletesRepository.create({
      name,
      birthDate,
    });

    return athlete;
  }
}

export default CreateAthleteService;
