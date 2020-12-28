"use strict";

var _FakeAthleteGroupsRepository = _interopRequireDefault(require("../../athletegroups/repositories/fakes/FakeAthleteGroupsRepository"));

var _FakeReferralGroupsRepository = _interopRequireDefault(require("../../referralgroups/repositories/fakes/FakeReferralGroupsRepository"));

var _FakeSubscriptionsRepository = _interopRequireDefault(require("../../subscriptions/repositories/fakes/FakeSubscriptionsRepository"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeAthletesRepository = _interopRequireDefault(require("../repositories/fakes/FakeAthletesRepository"));

var _ListActiveAthletesByReferralGroupService = _interopRequireDefault(require("./ListActiveAthletesByReferralGroupService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let listActiveAthletesByRefGroup;
let fakeAthletesRepository;
let fakeSubscriptionsRepository;
let fakeAthleteGroupsRepository;
let fakeReferralGroupsRepository;
describe('ListActiveAthletesByReferralGroupService', () => {
  beforeEach(() => {
    fakeAthletesRepository = new _FakeAthletesRepository.default();
    fakeSubscriptionsRepository = new _FakeSubscriptionsRepository.default();
    fakeAthleteGroupsRepository = new _FakeAthleteGroupsRepository.default();
    fakeReferralGroupsRepository = new _FakeReferralGroupsRepository.default();
    listActiveAthletesByRefGroup = new _ListActiveAthletesByReferralGroupService.default(fakeAthletesRepository);
  });
  it('should be able to list active athletes in an specific referral group', async () => {
    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100
    });
    const athleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de testes',
      description: 'Grupo utilizado em testes'
    });
    const athletes = [];
    const athlete1 = await fakeAthletesRepository.create({
      name: 'Aluno de testes 1',
      phoneNumber: '1',
      birthDate: new Date(1995, 5, 5),
      athleteGroup,
      subscription
    });
    const referralGroup = await fakeReferralGroupsRepository.create({
      referral: athlete1,
      title: 'Nome do aluno'
    });
    Object.assign(athlete1, {
      referral_group_id: referralGroup.id
    });
    athletes.push(athlete1);
    await fakeAthletesRepository.save(athlete1);
    const findActiveAthletes = await listActiveAthletesByRefGroup.execute({
      referral_group_id: referralGroup.id
    });
    expect(findActiveAthletes).toEqual({
      athletes,
      count: 1
    });
  });
  it('should throw an exception if id is not informed', async () => {
    await expect(listActiveAthletesByRefGroup.execute({
      referral_group_id: ''
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});