import AppError from '@shared/errors/AppError';
import { getRepository } from 'typeorm';
import { parseISO } from 'date-fns';
import Athlete from '../infra/typeorm/entities/Athlete';

interface IRequest {
  id: string;
  name: string;
  birthDate: string;
  phoneNumber: string;
}

class UpdateAthleteService {
  public async execute({
    id,
    name,
    birthDate,
    phoneNumber,
  }: IRequest): Promise<Athlete> {
    const athletesRepository = getRepository(Athlete);

    const athlete = await athletesRepository.findOne(id);

    if (!athlete) {
      throw new AppError(404, 'Aluno não encontrado');
    }

    if (!name || !birthDate || !phoneNumber) {
      throw new AppError(400, 'Informe nome, data de nascimento e telefone');
    }

    athlete.name = name;
    athlete.birthDate = parseISO(birthDate);
    athlete.phoneNumber = phoneNumber;

    await athletesRepository.save(athlete);

    return athlete;
  }
}

export default UpdateAthleteService;
