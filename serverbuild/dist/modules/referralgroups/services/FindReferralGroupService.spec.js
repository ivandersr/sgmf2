"use strict";

var _FakeAthleteGroupsRepository = _interopRequireDefault(require("../../athletegroups/repositories/fakes/FakeAthleteGroupsRepository"));

var _FakeAthletesRepository = _interopRequireDefault(require("../../athletes/repositories/fakes/FakeAthletesRepository"));

var _FakeSubscriptionsRepository = _interopRequireDefault(require("../../subscriptions/repositories/fakes/FakeSubscriptionsRepository"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeReferralGroupsRepository = _interopRequireDefault(require("../repositories/fakes/FakeReferralGroupsRepository"));

var _FindReferralGroupService = _interopRequireDefault(require("./FindReferralGroupService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAthletesRepository;
let fakeAthleteGroupsRepository;
let fakeSubscriptionsRepository;
let fakeReferralGroupsRepository;
let findReferralGroup;
describe('FindReferralGroupService', () => {
  beforeEach(() => {
    fakeAthletesRepository = new _FakeAthletesRepository.default();
    fakeAthleteGroupsRepository = new _FakeAthleteGroupsRepository.default();
    fakeSubscriptionsRepository = new _FakeSubscriptionsRepository.default();
    fakeReferralGroupsRepository = new _FakeReferralGroupsRepository.default();
    findReferralGroup = new _FindReferralGroupService.default(fakeReferralGroupsRepository);
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
      phoneNumber: '1',
      birthDate: new Date(1994, 1, 1),
      subscription,
      athleteGroup
    });
    const referralGroup = await fakeReferralGroupsRepository.create({
      referral: athlete,
      title: 'Grupo de indicações de testes'
    });
    const findRefGroup = await findReferralGroup.execute({
      referral_group_id: referralGroup.id
    });
    expect(findRefGroup).toEqual(referralGroup);
  });
  it('should throw an exception if referral group id is empty', async () => {
    await expect(findReferralGroup.execute({
      referral_group_id: ''
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should throw an exception if referral group is not found', async () => {
    await expect(findReferralGroup.execute({
      referral_group_id: 'id inválido'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});