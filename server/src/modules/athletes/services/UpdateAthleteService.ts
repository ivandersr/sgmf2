import { inject, injectable } from 'tsyringe';
import { parseISO } from 'date-fns';
import AppError from '@shared/errors/AppError';
import IAthletesRepository from '../repositories/IAthletesRepository';
import IUpdateAthleteDataDTO from '../dtos/IUpdateAthleteDataDTO';
import Athlete from '../infra/typeorm/entities/Athlete';

@injectable()
class UpdateAthleteService {
  constructor(
    @inject('AthletesRepository')
    private athletesRepository: IAthletesRepository,
  ) { }

  public async execute({
    id,
    name,
    birthDate,
    phoneNumber,
  }: IUpdateAthleteDataDTO): Promise<Athlete> {
    const athlete = await this.athletesRepository.findOne({ id });

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

    await this.athletesRepository.save(athlete);

    return athlete;
  }
}

export default UpdateAthleteService;
