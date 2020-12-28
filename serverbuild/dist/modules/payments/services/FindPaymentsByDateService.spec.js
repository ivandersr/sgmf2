"use strict";

var _FakeAthletesRepository = _interopRequireDefault(require("../../athletes/repositories/fakes/FakeAthletesRepository"));

var _FakeAthleteGroupsRepository = _interopRequireDefault(require("../../athletegroups/repositories/fakes/FakeAthleteGroupsRepository"));

var _FakeSubscriptionsRepository = _interopRequireDefault(require("../../subscriptions/repositories/fakes/FakeSubscriptionsRepository"));

var _FakePaymentsRepository = _interopRequireDefault(require("../repositories/fakes/FakePaymentsRepository"));

var _FindPaymentsByDateService = _interopRequireDefault(require("./FindPaymentsByDateService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAthletesRepository;
let fakeAthleteGroupsRepository;
let fakeSubscriptionsRepository;
let fakePaymentsRepository;
let findPaymentsByDate;
describe('FindPaymentsByDateService', () => {
  beforeEach(() => {
    fakeAthletesRepository = new _FakeAthletesRepository.default();
    fakeAthleteGroupsRepository = new _FakeAthleteGroupsRepository.default();
    fakeSubscriptionsRepository = new _FakeSubscriptionsRepository.default();
    fakePaymentsRepository = new _FakePaymentsRepository.default();
    findPaymentsByDate = new _FindPaymentsByDateService.default(fakePaymentsRepository);
  });
  it('should be able to find payments by date', async () => {
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
      paymentDate: new Date(2021, 11, 11),
      nextDueDate: new Date(2022, 0, 11),
      value: 100
    });
    const findPayments = await findPaymentsByDate.execute({
      paymentDate: '2021-12-11'
    });
    expect(findPayments).toEqual([payment]);
  });
});