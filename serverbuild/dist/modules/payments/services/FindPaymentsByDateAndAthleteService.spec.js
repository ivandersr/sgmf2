"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeAthletesRepository = _interopRequireDefault(require("../../athletes/repositories/fakes/FakeAthletesRepository"));

var _FakeAthleteGroupsRepository = _interopRequireDefault(require("../../athletegroups/repositories/fakes/FakeAthleteGroupsRepository"));

var _FakeSubscriptionsRepository = _interopRequireDefault(require("../../subscriptions/repositories/fakes/FakeSubscriptionsRepository"));

var _FakePaymentsRepository = _interopRequireDefault(require("../repositories/fakes/FakePaymentsRepository"));

var _FindPaymentsByDateAndAthleteService = _interopRequireDefault(require("./FindPaymentsByDateAndAthleteService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAthletesRepository;
let fakeAthleteGroupsRepository;
let fakeSubscriptionsRepository;
let fakePaymentsRepository;
let findPaymentsByDateAndAthlete;
describe('FindPaymentsByDateAndAthleteService', () => {
  beforeEach(() => {
    fakeAthletesRepository = new _FakeAthletesRepository.default();
    fakeAthleteGroupsRepository = new _FakeAthleteGroupsRepository.default();
    fakeSubscriptionsRepository = new _FakeSubscriptionsRepository.default();
    fakePaymentsRepository = new _FakePaymentsRepository.default();
    findPaymentsByDateAndAthlete = new _FindPaymentsByDateAndAthleteService.default(fakeAthletesRepository, fakePaymentsRepository);
  });
  it('should be able to list payments by date and athlete', async () => {
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
      value: 100,
      monthsPaid: 1,
      paymentDate: new Date(2020, 11, 27),
      nextDueDate: new Date(2021, 0, 27)
    });
    const findPayments = await findPaymentsByDateAndAthlete.execute({
      athlete_id: athlete.id,
      paymentDate: '2020-12-27'
    });
    expect(findPayments).toEqual([payment]);
  });
  it('should throw an exception if athlete is not found', async () => {
    await expect(findPaymentsByDateAndAthlete.execute({
      athlete_id: 'id inválido',
      paymentDate: '2020-12-27'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});