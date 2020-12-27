import FakeAthleteGroupsRepository from '@modules/athletegroups/repositories/fakes/FakeAthleteGroupsRepository';
import FakeAthletesRepository from '@modules/athletes/repositories/fakes/FakeAthletesRepository';
import FakeSubscriptionsRepository from '@modules/subscriptions/repositories/fakes/FakeSubscriptionsRepository';
import AppError from '@shared/errors/AppError';
import FakePaymentsRepository from '../repositories/fakes/FakePaymentsRepository';
import CreatePaymentService from './CreatePaymentService';

let fakePaymentsRepository: FakePaymentsRepository;
let fakeAthletesRepository: FakeAthletesRepository;
let fakeAthleteGroupsRepository: FakeAthleteGroupsRepository;
let fakeSubscriptionsRepository: FakeSubscriptionsRepository;
let createPayment: CreatePaymentService;

describe('CreatePayment', () => {
  beforeEach(() => {
    fakePaymentsRepository = new FakePaymentsRepository();
    fakeAthleteGroupsRepository = new FakeAthleteGroupsRepository();
    fakeSubscriptionsRepository = new FakeSubscriptionsRepository();
    fakeAthletesRepository = new FakeAthletesRepository();
    createPayment = new CreatePaymentService(
      fakeAthletesRepository,
      fakePaymentsRepository
    );
  });

  it('should be able to create a new payment', async () => {
    const athleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de alunos de testes',
      description: 'Descrição grupo de alunos para testes',
    });

    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100,
    });

    const athlete = await fakeAthletesRepository.create({
      name: 'Aluno de testes',
      birthDate: new Date(1991, 6, 25),
      phoneNumber: '99999999',
      athleteGroup,
      subscription,
    });

    const payment = await createPayment.execute({
      athlete_id: athlete.id,
      monthsPaid: 3,
      paymentDate: new Date(2020, 11, 18).toDateString(),
      value: 100,
    });

    const expectedNextDueDate = new Date(2021, 2, 18, 0, 0, 0);

    expect(payment).toHaveProperty('id');
    expect(payment.athlete).toEqual(athlete);
    expect(payment.nextDueDate).toEqual(expectedNextDueDate);
  });

  it('should throw an exception if value is falsy', async () => {
    const athleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de alunos de testes',
      description: 'Descrição grupo de alunos para testes',
    });

    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100,
    });

    const athlete = await fakeAthletesRepository.create({
      name: 'Aluno de testes',
      birthDate: new Date(1991, 6, 25),
      phoneNumber: '99999999',
      athleteGroup,
      subscription,
    });

    await expect(
      createPayment.execute({
        athlete_id: athlete.id,
        monthsPaid: 3,
        paymentDate: new Date(2020, 11, 18).toDateString(),
        value: 0,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw an exception if paymentDate is empty', async () => {
    const athleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de alunos de testes',
      description: 'Descrição grupo de alunos para testes',
    });

    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100,
    });

    const athlete = await fakeAthletesRepository.create({
      name: 'Aluno de testes',
      birthDate: new Date(1991, 6, 25),
      phoneNumber: '99999999',
      athleteGroup,
      subscription,
    });

    await expect(
      createPayment.execute({
        athlete_id: athlete.id,
        monthsPaid: 3,
        paymentDate: '',
        value: 100,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw an exception if amount of months paid is falsy',
    async () => {
      const athleteGroup = await fakeAthleteGroupsRepository.create({
        title: 'Grupo de alunos de testes',
        description: 'Descrição grupo de alunos para testes',
      });

      const subscription = await fakeSubscriptionsRepository.create({
        title: 'Plano de testes',
        value: 100,
      });

      const athlete = await fakeAthletesRepository.create({
        name: 'Aluno de testes',
        birthDate: new Date(1991, 6, 25),
        phoneNumber: '99999999',
        athleteGroup,
        subscription,
      });

      await expect(
        createPayment.execute({
          athlete_id: athlete.id,
          monthsPaid: 0,
          paymentDate: '2021-12-15',
          value: 100,
        })
      ).rejects.toBeInstanceOf(AppError);
    });

  it('should throw an exception if athlete id is empty', async () => {
    await expect(
      createPayment.execute({
        athlete_id: '',
        monthsPaid: 2,
        paymentDate: '2021-12-15',
        value: 100,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw an exception if athlete is not found', async () => {
    await expect(
      createPayment.execute({
        athlete_id: 'id inválido',
        monthsPaid: 2,
        paymentDate: '2021-12-15',
        value: 100,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
