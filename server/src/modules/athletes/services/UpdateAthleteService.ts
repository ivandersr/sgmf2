import AppError from '@shared/errors/AppError';
import { getRepository } from 'typeorm';
import { parseISO } from 'date-fns';
import Athlete from '../infra/typeorm/entities/Athlete';
import IUpdateAthleteDataDTO from '../dtos/IUpdateAthleteDataDTO';

class UpdateAthleteService {
  public async execute({
    id,
    name,
    birthDate,
    phoneNumber,
  }: IUpdateAthleteDataDTO): Promise<Athlete> {
    const athletesRepository = getRepository(Athlete);

    const athlete = await athletesRepository.findOne(id);

    if (!athlete) {
      throw new AppError(404, 'Aluno não encontrado');
    }

    if (!name || !birthDate || !phoneNumber) {
      throw new AppError(400, 'Informe nome, data de nascimento e telefone');
    }

    Object.assign(athlete, {
      name,
      birthDate: parseISO(birthDate),
      phoneNumber,
    });

    await athletesRepository.save(athlete);

    return athlete;
  }
}

export default UpdateAthleteService;
