import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Athlete from '../models/Athlete';
import Subscription from '../models/Subscription';

interface IRequest {
  name: string;
  birthDate: Date;
  phoneNumber: string;
  subscription_id: string;
}

class CreateAthleteService {
  public async execute({
    name,
    birthDate,
    phoneNumber,
    subscription_id,
  }: IRequest): Promise<Athlete> {
    if (!name) {
      throw new AppError(400, 'Nome não pode estar vazio.');
    }

    if (!birthDate) {
      throw new AppError(400, 'Data de nascimento não pode estar vazia.');
    }

    const athletesRepository = getRepository(Athlete);

    const subscriptionsRepository = getRepository(Subscription);

    const subscription = await subscriptionsRepository.findOne(subscription_id);

    const athlete = athletesRepository.create({
      name,
      birthDate,
      phoneNumber,
      subscription,
    });

    await athletesRepository.save(athlete);

    return athlete;
  }
}

export default CreateAthleteService;
