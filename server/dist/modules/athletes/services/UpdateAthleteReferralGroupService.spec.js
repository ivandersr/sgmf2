"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeReferralGroupsRepository = _interopRequireDefault(require("../../referralgroups/repositories/fakes/FakeReferralGroupsRepository"));

var _FakeSubscriptionsRepository = _interopRequireDefault(require("../../subscriptions/repositories/fakes/FakeSubscriptionsRepository"));

var _FakeAthleteGroupsRepository = _interopRequireDefault(require("../../athletegroups/repositories/fakes/FakeAthleteGroupsRepository"));

var _FakeAthletesRepository = _interopRequireDefault(require("../repositories/fakes/FakeAthletesRepository"));

var _UpdateAthleteReferralGroupService = _interopRequireDefault(require("./UpdateAthleteReferralGroupService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAthletesRepository;
let fakeAthleteGroupsRepository;
let fakeReferralGroupsRepository;
let fakeSubscriptionsRepository;
let updateAthleteReferralGroup;
describe('UpdateAthleteReferralGroupService', () => {
  beforeEach(() => {
    fakeAthletesRepository = new _FakeAthletesRepository.default();
    fakeAthleteGroupsRepository = new _FakeAthleteGroupsRepository.default();
    fakeReferralGroupsRepository = new _FakeReferralGroupsRepository.default();
    fakeSubscriptionsRepository = new _FakeSubscriptionsRepository.default();
    updateAthleteReferralGroup = new _UpdateAthleteReferralGroupService.default(fakeAthletesRepository, fakeReferralGroupsRepository);
  });
  it('should be able to update an athlete\'s referral group', async () => {
    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100
    });
    const athleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de testes',
      description: 'Descrição grupo de testes'
    });
    const referral = await fakeAthletesRepository.create({
      name: 'Aluno de testes',
      phoneNumber: '1',
      birthDate: new Date(1997, 11, 11),
      subscription,
      athleteGroup
    });
    const athlete = await fakeAthletesRepository.create({
      name: 'Aluno de testes',
      phoneNumber: '1',
      birthDate: new Date(1997, 11, 11),
      subscription,
      athleteGroup
    });
    const referralGroup = await fakeReferralGroupsRepository.create({
      referral,
      title: 'Grupo de indicações de testes'
    });
    const updatedAthlete = await updateAthleteReferralGroup.execute({
      id: athlete.id,
      referral_group_id: referralGroup.id
    });
    expect(updatedAthlete.referral_group_id).toBe(referralGroup.id);
  });
  it('should throw an exception if athlete is not found', async () => {
    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100
    });
    const athleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de testes',
      description: 'Descrição grupo de testes'
    });
    const referral = await fakeAthletesRepository.create({
      name: 'Aluno de testes',
      phoneNumber: '1',
      birthDate: new Date(1997, 11, 11),
      subscription,
      athleteGroup
    });
    const referralGroup = await fakeReferralGroupsRepository.create({
      referral,
      title: 'Grupo de indicações de testes'
    });
    await expect(updateAthleteReferralGroup.execute({
      id: 'id inválido',
      referral_group_id: referralGroup.id
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should throw an exception if referral group is not found', async () => {
    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100
    });
    const athleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de testes',
      description: 'Descrição grupo de testes'
    });
    const athlete = await fakeAthletesRepository.create({
      name: 'Aluno de testes',
      phoneNumber: '1',
      birthDate: new Date(1997, 11, 11),
      subscription,
      athleteGroup
    });
    await expect(updateAthleteReferralGroup.execute({
      id: athlete.id,
      referral_group_id: 'id inválido'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});