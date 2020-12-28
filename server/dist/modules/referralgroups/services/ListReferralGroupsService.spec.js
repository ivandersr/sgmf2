"use strict";

var _FakeAthleteGroupsRepository = _interopRequireDefault(require("../../athletegroups/repositories/fakes/FakeAthleteGroupsRepository"));

var _FakeAthletesRepository = _interopRequireDefault(require("../../athletes/repositories/fakes/FakeAthletesRepository"));

var _FakeSubscriptionsRepository = _interopRequireDefault(require("../../subscriptions/repositories/fakes/FakeSubscriptionsRepository"));

var _FakeReferralGroupsRepository = _interopRequireDefault(require("../repositories/fakes/FakeReferralGroupsRepository"));

var _ListReferralGroupsService = _interopRequireDefault(require("./ListReferralGroupsService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAthletesRepository;
let fakeAthleteGroupsRepository;
let fakeSubscriptionsRepository;
let fakeReferralGroupsRepository;
let listReferralGroups;
describe('ListReferralGroupsService', () => {
  beforeEach(() => {
    fakeAthletesRepository = new _FakeAthletesRepository.default();
    fakeAthleteGroupsRepository = new _FakeAthleteGroupsRepository.default();
    fakeSubscriptionsRepository = new _FakeSubscriptionsRepository.default();
    fakeReferralGroupsRepository = new _FakeReferralGroupsRepository.default();
    listReferralGroups = new _ListReferralGroupsService.default(fakeReferralGroupsRepository);
  });
  it('should be able to list referral groups', async () => {
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
      birthDate: new Date(1995, 1, 1),
      phoneNumber: '1',
      subscription,
      athleteGroup
    });
    const referralGroup = await fakeReferralGroupsRepository.create({
      referral: athlete,
      title: 'Grupo de indicações de testes'
    });
    const findRefGroups = await listReferralGroups.execute();
    expect(findRefGroups).toEqual([referralGroup]);
  });
});