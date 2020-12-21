import { container } from 'tsyringe';
import AthleteGroupsRepository from '@modules/athletegroups/infra/typeorm/repositories/AthleteGroupsRepository';
import IAthleteGroupsRepository from '@modules/athletegroups/repositories/IAthleteGroupsRepository';
import AthletesRepository from '@modules/athletes/infra/typeorm/repositories/AthletesRepository';
import IAthletesRepository from '@modules/athletes/repositories/IAthletesRepository';
import ISubscriptionsRepository from '@modules/subscriptions/repositories/ISubscriptionsRepository';
import SubscriptionsRepository from '@modules/subscriptions/infra/typeorm/repositories/SubscriptionsRepository';

container.registerSingleton<IAthleteGroupsRepository>(
  'AthleteGroupsRepository',
  AthleteGroupsRepository,
);

container.registerSingleton<IAthletesRepository>(
  'AthletesRepository',
  AthletesRepository,
);

container.registerSingleton<ISubscriptionsRepository>(
  'SubscriptionsRepository',
  SubscriptionsRepository,
);
