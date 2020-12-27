import FakeAthleteGroupsRepository from '@modules/athletegroups/repositories/fakes/FakeAthleteGroupsRepository';
import FakeSubscriptionsRepository from '@modules/subscriptions/repositories/fakes/FakeSubscriptionsRepository';
import AppError from '@shared/errors/AppError';
import FakeAthletesRepository from '../repositories/fakes/FakeAthletesRepository';
import Athlete from '../infra/typeorm/entities/Athlete';
import ListAthletesService from './ListAthletesService';


let fakeAthletesRepository: FakeAthletesRepository;
let fakeAthleteGroupsRepository: FakeAthleteGroupsRepository;
let fakeSubscriptionsRepository: FakeSubscriptionsRepository;
let listAthletes: ListAthletesService;
let athletes: Athlete[];

describe('ListAthletesService', () => {
  beforeEach(() => {
    fakeAthletesRepository = new FakeAthletesRepository();
    fakeAthleteGroupsRepository = new FakeAthleteGroupsRepository();
    fakeSubscriptionsRepository = new FakeSubscriptionsRepository();
    listAthletes = new ListAthletesService(
      fakeAthletesRepository
    );
    athletes = [];
  });

  it('should be able to list athletes', async () => {
    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100,
    });

    const athleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de testes',
      description: 'Descrição grupo de testes',
    });

    const athlete1 = await fakeAthletesRepository.create({
      name: 'Aluno de testes',
      phoneNumber: '1',
      birthDate: new Date(1992, 2, 2),
      subscription,
      athleteGroup,
    });

    const athlete2 = await fakeAthletesRepository.create({
      name: 'Aluno de testes',
      phoneNumber: '1',
      birthDate: new Date(1992, 2, 2),
      subscription,
      athleteGroup,
    });

    athletes.push(athlete1, athlete2);

    const findAthletes = await listAthletes.execute({
      page: '0',
      pageSize: '1'
    });

    expect(findAthletes).toEqual({ athletes, total: 2, pages: 2 })
  });

  it('should return full list if page or pageSize is empty', async () => {
    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100,
    });

    const athleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de testes',
      description: 'Descrição grupo de testes',
    });

    const athlete1 = await fakeAthletesRepository.create({
      name: 'Aluno de testes',
      phoneNumber: '1',
      birthDate: new Date(1992, 2, 2),
      subscription,
      athleteGroup,
    });

    const athlete2 = await fakeAthletesRepository.create({
      name: 'Aluno de testes',
      phoneNumber: '1',
      birthDate: new Date(1992, 2, 2),
      subscription,
      athleteGroup,
    });

    athletes.push(athlete1, athlete2);

    const findAthletes = await listAthletes.execute({
      page: '',
      pageSize: '2',
    });

    expect(findAthletes).toEqual({ athletes, total: 2, pages: 1 });
  });

  it('should not be able to return list with non-numeric page or pageSize',
    async () => {
      await expect(
        listAthletes.execute({ page: '1', pageSize: 'non-numeric' })
      ).rejects.toBeInstanceOf(AppError);
    });
});
