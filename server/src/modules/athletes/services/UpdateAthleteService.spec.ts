import AppError from '@shared/errors/AppError';
import FakeAthleteGroupsRepository from '@modules/athletegroups/repositories/fakes/FakeAthleteGroupsRepository';
import FakeSubscriptionsRepository from '@modules/subscriptions/repositories/fakes/FakeSubscriptionsRepository';
import FakeAthletesRepository from '../repositories/fakes/FakeAthletesRepository';
import UpdateAthleteService from './UpdateAthleteService';

let fakeAthletesRepository: FakeAthletesRepository;
let fakeAthleteGroupsRepository: FakeAthleteGroupsRepository;
let fakeSubscriptionsRepository: FakeSubscriptionsRepository;
let updateAthlete: UpdateAthleteService;

describe('UpdateAthleteService', () => {
  beforeEach(() => {
    fakeAthletesRepository = new FakeAthletesRepository();
    fakeAthleteGroupsRepository = new FakeAthleteGroupsRepository();
    fakeSubscriptionsRepository = new FakeSubscriptionsRepository();
    updateAthlete = new UpdateAthleteService(
      fakeAthletesRepository
    );
  });

  it('should be able to update athlete\'s details', async () => {
    const athleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de testes',
      description: 'Descrição grupo de testes',
    });

    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100,
    });

    const athlete = await fakeAthletesRepository.create({
      name: 'Aluno de testes',
      phoneNumber: '1',
      birthDate: new Date(1995, 9, 9),
      subscription,
      athleteGroup,
    });

    const updatedAthlete = await updateAthlete.execute({
      id: athlete.id,
      birthDate: '1995-10-25',
      name: 'Aluno de testes atualizado',
      phoneNumber: '2',
    });

    expect(updatedAthlete.birthDate).toEqual(new Date(1995, 9, 25));
    expect(updatedAthlete.name).toBe('Aluno de testes atualizado');
    expect(updatedAthlete.phoneNumber).toBe('2');
  });

  it('should throw an exception if athlete is not found', async () => {
    await expect(
      updateAthlete.execute({
        id: 'id inválido',
        name: 'teste',
        phoneNumber: 'teste',
        birthDate: '1995-10-25',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw an exception if name, phone number or birth date is missing',
    async () => {
      const athleteGroup = await fakeAthleteGroupsRepository.create({
        title: 'Grupo de testes',
        description: 'Descrição grupo de testes',
      });

      const subscription = await fakeSubscriptionsRepository.create({
        title: 'Plano de testes',
        value: 100,
      });

      const athlete = await fakeAthletesRepository.create({
        name: 'Aluno de testes',
        phoneNumber: '1',
        birthDate: new Date(1995, 9, 9),
        subscription,
        athleteGroup,
      });

      await expect(
        updateAthlete.execute({
          id: athlete.id,
          name: '',
          phoneNumber: 'teste',
          birthDate: '1995-10-25',
        })
      ).rejects.toBeInstanceOf(AppError);

      await expect(
        updateAthlete.execute({
          id: athlete.id,
          name: 'teste',
          phoneNumber: '',
          birthDate: '1995-10-25',
        })
      ).rejects.toBeInstanceOf(AppError);

      await expect(
        updateAthlete.execute({
          id: athlete.id,
          name: 'teste',
          phoneNumber: 'teste',
          birthDate: '',
        })
      ).rejects.toBeInstanceOf(AppError);
    });
});
