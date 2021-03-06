import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IRequest, IResponse } from '../dtos/IListAthletesWithPaginationDTO';
import IAthletesRepository from '../repositories/IAthletesRepository';

@injectable()
class ListAthletesService {
  constructor(
    @inject('AthletesRepository')
    private athletesRepository: IAthletesRepository,
  ) { }

  public async execute({ page, pageSize }: IRequest): Promise<IResponse> {
    if (!page || !pageSize) {
      const [athletes, total] = await this.athletesRepository.findAndCount();
      return { athletes, total, pages: 1 };
    }

    if (isNaN(Number(page)) || isNaN(Number(pageSize))) {
      throw new AppError(400, 'A página e seu tamanho devem ser numéricos');
    }

    const [athletes, total] = await this.athletesRepository.findAndCount({
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
