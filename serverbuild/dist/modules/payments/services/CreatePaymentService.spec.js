"use strict";

var _FakeAthleteGroupsRepository = _interopRequireDefault(require("../../athletegroups/repositories/fakes/FakeAthleteGroupsRepository"));

var _FakeAthletesRepository = _interopRequireDefault(require("../../athletes/repositories/fakes/FakeAthletesRepository"));

var _FakeSubscriptionsRepository = _interopRequireDefault(require("../../subscriptions/repositories/fakes/FakeSubscriptionsRepository"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakePaymentsRepository = _interopRequireDefault(require("../repositories/fakes/FakePaymentsRepository"));

var _CreatePaymentService = _interopRequireDefault(require("./CreatePaymentService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakePaymentsRepository;
let fakeAthletesRepository;
let fakeAthleteGroupsRepository;
let fakeSubscriptionsRepository;
let createPayment;
describe('CreatePayment', () => {
  beforeEach(() => {
    fakePaymentsRepository = new _FakePaymentsRepository.default();
    fakeAthleteGroupsRepository = new _FakeAthleteGroupsRepository.default();
    fakeSubscriptionsRepository = new _FakeSubscriptionsRepository.default();
    fakeAthletesRepository = new _FakeAthletesRepository.default();
    createPayment = new _CreatePaymentService.default(fakeAthletesRepository, fakePaymentsRepository);
  });
  it('should be able to create a new payment', async () => {
    const athleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de alunos de testes',
      description: 'Descrição grupo de alunos para testes'
    });
    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100
    });
    const athlete = await fakeAthletesRepository.create({
      name: 'Aluno de testes',
      birthDate: new Date(1991, 6, 25),
      phoneNumber: '99999999',
      athleteGroup,
      subscription
    });
    const payment = await createPayment.execute({
      athlete_id: athlete.id,
      monthsPaid: 3,
      paymentDate: new Date(2020, 11, 18).toDateString(),
      value: 100
    });
    const expectedNextDueDate = new Date(2021, 2, 18, 0, 0, 0);
    expect(payment).toHaveProperty('id');
    expect(payment.athlete).toEqual(athlete);
    expect(payment.nextDueDate).toEqual(expectedNextDueDate);
  });
  it('should throw an exception if value is falsy', async () => {
    const athleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de alunos de testes',
      description: 'Descrição grupo de alunos para testes'
    });
    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100
    });
    const athlete = await fakeAthletesRepository.create({
      name: 'Aluno de testes',
      birthDate: new Date(1991, 6, 25),
      phoneNumber: '99999999',
      athleteGroup,
      subscription
    });
    await expect(createPayment.execute({
      athlete_id: athlete.id,
      monthsPaid: 3,
      paymentDate: new Date(2020, 11, 18).toDateString(),
      value: 0
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should throw an exception if paymentDate is empty', async () => {
    const athleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de alunos de testes',
      description: 'Descrição grupo de alunos para testes'
    });
    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100
    });
    const athlete = await fakeAthletesRepository.create({
      name: 'Aluno de testes',
      birthDate: new Date(1991, 6, 25),
      phoneNumber: '99999999',
      athleteGroup,
      subscription
    });
    await expect(createPayment.execute({
      athlete_id: athlete.id,
      monthsPaid: 3,
      paymentDate: '',
      value: 100
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should throw an exception if amount of months paid is falsy', async () => {
    const athleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de alunos de testes',
      description: 'Descrição grupo de alunos para testes'
    });
    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100
    });
    const athlete = await fakeAthletesRepository.create({
      name: 'Aluno de testes',
      birthDate: new Date(1991, 6, 25),
      phoneNumber: '99999999',
      athleteGroup,
      subscription
    });
    await expect(createPayment.execute({
      athlete_id: athlete.id,
      monthsPaid: 0,
      paymentDate: '2021-12-15',
      value: 100
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should throw an exception if athlete id is empty', async () => {
    await expect(createPayment.execute({
      athlete_id: '',
      monthsPaid: 2,
      paymentDate: '2021-12-15',
      value: 100
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should throw an exception if athlete is not found', async () => {
    await expect(createPayment.execute({
      athlete_id: 'id inválido',
      monthsPaid: 2,
      paymentDate: '2021-12-15',
      value: 100
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});