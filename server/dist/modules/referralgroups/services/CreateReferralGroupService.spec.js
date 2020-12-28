"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeAthleteGroupsRepository = _interopRequireDefault(require("../../athletegroups/repositories/fakes/FakeAthleteGroupsRepository"));

var _FakeSubscriptionsRepository = _interopRequireDefault(require("../../subscriptions/repositories/fakes/FakeSubscriptionsRepository"));

var _FakeAthletesRepository = _interopRequireDefault(require("../../athletes/repositories/fakes/FakeAthletesRepository"));

var _FakeReferralGroupsRepository = _interopRequireDefault(require("../repositories/fakes/FakeReferralGroupsRepository"));

var _CreateReferralGroupService = _interopRequireDefault(require("./CreateReferralGroupService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAthleteGroupsRepository;
let fakeSubscriptionsRepository;
let fakeAthletesRepository;
let fakeReferralGroupsRepository;
let createReferralGroup;
describe('CreateReferralGroupService', () => {
  beforeEach(() => {
    fakeAthleteGroupsRepository = new _FakeAthleteGroupsRepository.default();
    fakeSubscriptionsRepository = new _FakeSubscriptionsRepository.default();
    fakeAthletesRepository = new _FakeAthletesRepository.default();
    fakeReferralGroupsRepository = new _FakeReferralGroupsRepository.default();
    createReferralGroup = new _CreateReferralGroupService.default(fakeReferralGroupsRepository, fakeAthletesRepository);
  });
  it('should be able to create a referral group from athlete id', async () => {
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
    const referralGroup = await createReferralGroup.execute({
      referral_id: athlete.id
    });
    expect(referralGroup).toHaveProperty('id');
    expect(referralGroup.referral.id).toBe(athlete.id);
  });
  it('should throw an exception if referral id is empty', async () => {
    await expect(createReferralGroup.execute({
      referral_id: ''
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should throw an exception if referral athlete is not found', async () => {
    await expect(createReferralGroup.execute({
      referral_id: 'id inválido'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});