import { getRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { IRequest, IResponse } from '../dtos/IListAthletesWithPaginationDTO';
import Athlete from '../infra/typeorm/entities/Athlete';

class ListAthletesService {
  public async execute({ page, pageSize }: IRequest): Promise<IResponse> {
    const athletesRepository = getRepository(Athlete);

    if (!page || !pageSize) {
      const [athletes, total] = await athletesRepository.findAndCount();
      return { athletes, total, pages: 1 };
    }

    if (isNaN(Number(page)) || isNaN(Number(pageSize))) {
      throw new AppError(400, 'A página e seu tamanho devem ser numéricos');
    }

    const [athletes, total] = await athletesRepository.findAndCount({
      skip: Number(page) * Number(pageSize),
      take: Number(pageSize),
      order: {
        name: 'ASC',
      },
    });

    const pages = Math.ceil(total / Number(pageSize));

    return { athletes, total, pages };
  }
}

export default ListAthletesService;
