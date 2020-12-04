import { getRepository } from 'typeorm';
import Athlete from '../infra/typeorm/entities/Athlete';
import AppError from '@shared/errors/AppError';

interface IRequest {
  page: string;
  pageSize: string;
}



class FindAthletesService {
  public async execute({ page, pageSize }: IRequest): Promise<Athlete[]> {
    const athletesRepository = getRepository(Athlete);

    if (!page || !pageSize) {
      return await athletesRepository.find();
    }

    if (isNaN(Number(page)) || isNaN(Number(pageSize))) {
      throw new AppError(400, 'A página e seu tamanho devem ser numéricos');
    }

    const athletes = await athletesRepository.find({
      skip: Number(page) * Number(pageSize),
      take: Number(pageSize),
    });

    return athletes;
  }
}

export default FindAthletesService;