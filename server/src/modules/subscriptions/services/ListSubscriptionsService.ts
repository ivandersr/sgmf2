import AppError from '@shared/errors/AppError';
import { getRepository } from 'typeorm';
import {
  IRequest,
  IResponse,
} from '../dtos/IListSubscriptionsWithPaginationDTO';
import Subscription from '../infra/typeorm/entities/Subscription';

class ListSubscriptionsService {
  public async execute({ page, pageSize }: IRequest): Promise<IResponse> {
    const subscriptionsRepository = getRepository(Subscription);

    if (!page || !pageSize) {
      const [
        subscriptions,
        total,
      ] = await subscriptionsRepository.findAndCount();
      return { subscriptions, total, pages: 1 };
    }

    if (isNaN(Number(page)) || isNaN(Number(pageSize))) {
      throw new AppError(400, 'A página e seu tamanho devem ser numéricos');
    }

    const [subscriptions, total] = await subscriptionsRepository.findAndCount({
      skip: Number(page) * Number(pageSize),
      take: Number(pageSize),
      order: {
        title: 'ASC',
      },
    });

    const pages = Math.ceil(total / Number(pageSize));

    return { subscriptions, total, pages };
  }
}

export default ListSubscriptionsService;
