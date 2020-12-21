import { getRepository } from 'typeorm';
import { parseISO } from 'date-fns';
import AppError from '@shared/errors/AppError';
import AthleteGroup from '@modules/athletegroups/infra/typeorm/entities/AthleteGroup';
import { inject, injectable } from 'tsyringe';
import ISubscriptionsRepository from '@modules/subscriptions/repositories/ISubscriptionsRepository';
import Athlete from '../infra/typeorm/entities/Athlete';
import ICreateAthleteServiceDTO from '../dtos/ICreateAthleteServiceDTO';
import IAthletesRepository from '../repositories/IAthletesRepository';

@injectable()
class CreateAthleteService {
  constructor(
    @inject('AthletesRepository')
    private athletesRepository: IAthletesRepository,

    @inject('SubscriptionsRepository')
    private subscriptionsRepository: ISubscriptionsRepository,
  ) { }

  public async execute({
    name,
    birthDate,
    phoneNumber,
    subscription_id,
    athlete_group_id,
  }: ICreateAthleteServiceDTO): Promise<Athlete> {
    if (!name) {
      throw new AppError(400, 'Nome não pode estar vazio (name).');
    }

    if (!birthDate) {
      throw new AppError(
        400,
        'Data de nascimento não pode estar vazia (birthDate).',
      );
    }

    if (!subscription_id) {
      throw new AppError(
        400,
        'Por favor, indique o plano desejado (subscription_id).',
      );
    }

    if (!athlete_group_id) {
      throw new AppError(
        400,
        'Indique a qual grupo o aluno pertence (athlete_group_id).',
      );
    }
    const athleteGroupsRepository = getRepository(AthleteGroup);

    const subscription = await this.subscriptionsRepository.findOne(
      { id: subscription_id }
    );
    const athleteGroup = await athleteGroupsRepository.findOne(
      athlete_group_id,
    );

    if (!subscription) {
      throw new AppError(404, 'Plano não encontrado');
    }

    if (!athleteGroup) {
      throw new AppError(404, 'Grupo não encontrado');
    }

    const athlete = await this.athletesRepository.create({
      name,
      birthDate: parseISO(birthDate),
      phoneNumber,
      subscription,
      athleteGroup,
    });

    return athlete;
  }
}

export default CreateAthleteService;
