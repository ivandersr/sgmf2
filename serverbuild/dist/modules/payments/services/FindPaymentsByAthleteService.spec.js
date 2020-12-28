"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeAthleteGroupsRepository = _interopRequireDefault(require("../../athletegroups/repositories/fakes/FakeAthleteGroupsRepository"));

var _FakeSubscriptionsRepository = _interopRequireDefault(require("../../subscriptions/repositories/fakes/FakeSubscriptionsRepository"));

var _FakeAthletesRepository = _interopRequireDefault(require("../../athletes/repositories/fakes/FakeAthletesRepository"));

var _FakePaymentsRepository = _interopRequireDefault(require("../repositories/fakes/FakePaymentsRepository"));

var _FindPaymentsByAthleteService = _interopRequireDefault(require("./FindPaymentsByAthleteService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAthletesRepository;
let fakeAthleteGroupsRepository;
let fakeSubscriptionsRepository;
let fakePaymentsRepository;
let findPaymentsByAthlete;
describe('FindPaymentsByAthleteService', () => {
  beforeEach(() => {
    fakeAthletesRepository = new _FakeAthletesRepository.default();
    fakeAthleteGroupsRepository = new _FakeAthleteGroupsRepository.default();
    fakeSubscriptionsRepository = new _FakeSubscriptionsRepository.default();
    fakePaymentsRepository = new _FakePaymentsRepository.default();
    findPaymentsByAthlete = new _FindPaymentsByAthleteService.default(fakeAthletesRepository, fakePaymentsRepository);
  });
  it('should be able to list payments by athlete', async () => {
    const athleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de testes',
      description: 'Descrição grupo de testes'
    });
    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100
    });
    const athlete = await fakeAthletesRepository.create({
      name: 'Aluno de testes',
      phoneNumber: '1',
      birthDate: new Date(1994, 1, 1),
      subscription,
      athleteGroup
    });
    const payment = await fakePaymentsRepository.create({
      athlete,
      monthsPaid: 1,
      paymentDate: new Date(2021, 10, 11),
      nextDueDate: new Date(2021, 11, 11),
      value: 100
    });
    const findPayments = await findPaymentsByAthlete.execute({
      athlete_id: athlete.id
    });
    expect(findPayments).toEqual([payment]);
  });
  it('should throw an exception if athlete is not found', async () => {
    await expect(findPaymentsByAthlete.execute({
      athlete_id: 'id inválido'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});