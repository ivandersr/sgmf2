"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeAthleteGroupsRepository = _interopRequireDefault(require("../../athletegroups/repositories/fakes/FakeAthleteGroupsRepository"));

var _FakeSubscriptionsRepository = _interopRequireDefault(require("../../subscriptions/repositories/fakes/FakeSubscriptionsRepository"));

var _FakeAthletesRepository = _interopRequireDefault(require("../repositories/fakes/FakeAthletesRepository"));

var _UpdateAthleteSubscriptionService = _interopRequireDefault(require("./UpdateAthleteSubscriptionService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAthletesRepository;
let fakeAthleteGroupsRepository;
let fakeSubscriptionsRepository;
let updateAthleteSubscription;
describe('UpdateAthleteSubscriptionService', () => {
  beforeEach(() => {
    fakeAthletesRepository = new _FakeAthletesRepository.default();
    fakeAthleteGroupsRepository = new _FakeAthleteGroupsRepository.default();
    fakeSubscriptionsRepository = new _FakeSubscriptionsRepository.default();
    updateAthleteSubscription = new _UpdateAthleteSubscriptionService.default(fakeAthletesRepository, fakeSubscriptionsRepository);
  });
  it('should be able to update athlete\'s subscription', async () => {
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
      birthDate: new Date(1995, 10, 10),
      phoneNumber: '1',
      subscription,
      athleteGroup
    });
    const newSubscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes - atualização de alunos',
      value: 50
    });
    const updatedAthlete = await updateAthleteSubscription.execute({
      athlete_id: athlete.id,
      subscription_id: newSubscription.id
    });
    expect(updatedAthlete.subscription.id).toBe(newSubscription.id);
  });
  it('should throw an exception if athlete is not found', async () => {
    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100
    });
    await expect(updateAthleteSubscription.execute({
      athlete_id: 'id inválido',
      subscription_id: subscription.id
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should throw an exception if subscription is not found', async () => {
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
      birthDate: new Date(1995, 10, 10),
      phoneNumber: '1',
      subscription,
      athleteGroup
    });
    await expect(updateAthleteSubscription.execute({
      athlete_id: athlete.id,
      subscription_id: 'id inválido'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});