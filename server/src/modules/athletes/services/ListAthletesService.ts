import { getRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Athlete from '../infra/typeorm/entities/Athlete';

interface IRequest {
  page: string;
  pageSize: string;
}

class ListAthletesService {
  public async execute({ page, pageSize }: IRequest): Promise<Athlete[]> {
    const athletesRepository = getRepository(Athlete);

    if (!page || !pageSize) {
      const athletes = await athletesRepository.find();
      return athletes;
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

export default ListAthletesService;
