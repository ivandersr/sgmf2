import { container } from 'tsyringe';
import AthleteGroupsRepository from '@modules/athletegroups/infra/typeorm/repositories/AthleteGroupsRepository';
import IAthleteGroupsRepository from '@modules/athletegroups/repositories/IAthleteGroupsRepository';

container.registerSingleton<IAthleteGroupsRepository>(
  'AthleteGroupsRepository',
  AthleteGroupsRepository,
);
