"use strict";

var _FakeAthleteGroupsRepository = _interopRequireDefault(require("../../athletegroups/repositories/fakes/FakeAthleteGroupsRepository"));

var _FakeSubscriptionsRepository = _interopRequireDefault(require("../../subscriptions/repositories/fakes/FakeSubscriptionsRepository"));

var _FakeAthletesRepository = _interopRequireDefault(require("../repositories/fakes/FakeAthletesRepository"));

var _ListAthletesByReferralGroupService = _interopRequireDefault(require("./ListAthletesByReferralGroupService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAthletesRepository;
let fakeAthleteGroupsRepository;
let fakeSubscriptionsRepository;
let listAthletesByReferralGroup;
describe('ListAthletesByReferralGroupService', () => {
  beforeEach(() => {
    fakeAthletesRepository = new _FakeAthletesRepository.default();
    fakeAthleteGroupsRepository = new _FakeAthleteGroupsRepository.default();
    fakeSubscriptionsRepository = new _FakeSubscriptionsRepository.default();
    listAthletesByReferralGroup = new _ListAthletesByReferralGroupService.default(fakeAthletesRepository);
  });
  it('should list athletes by referral groups using referral group id', async () => {
    const athleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de testes',
      description: 'Descrição grupo de testes'
    });
    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100
    });
    const athlete1 = await fakeAthletesRepository.create({
      name: 'Aluno de teste',
      phoneNumber: '1',
      birthDate: new Date(1980, 10, 10),
      athleteGroup,
      subscription
    });
    Object.assign(athlete1, {
      referral_group_id: '123'
    });
    const findAthletes = await listAthletesByReferralGroup.execute({
      referral_group_id: '123'
    });
    expect(findAthletes).toEqual([athlete1]);
  });
});