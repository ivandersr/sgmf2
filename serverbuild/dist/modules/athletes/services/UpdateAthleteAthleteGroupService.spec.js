"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeAthleteGroupsRepository = _interopRequireDefault(require("../../athletegroups/repositories/fakes/FakeAthleteGroupsRepository"));

var _FakeSubscriptionsRepository = _interopRequireDefault(require("../../subscriptions/repositories/fakes/FakeSubscriptionsRepository"));

var _FakeAthletesRepository = _interopRequireDefault(require("../repositories/fakes/FakeAthletesRepository"));

var _UpdateAthleteAthleteGroupService = _interopRequireDefault(require("./UpdateAthleteAthleteGroupService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAthletesRepository;
let fakeAthleteGroupsRepository;
let fakeSubscriptionsRepository;
let updateAthleteAthleteGroup;
describe('UpdateAthleteAthleteGroupService', () => {
  beforeEach(() => {
    fakeAthletesRepository = new _FakeAthletesRepository.default();
    fakeAthleteGroupsRepository = new _FakeAthleteGroupsRepository.default();
    fakeSubscriptionsRepository = new _FakeSubscriptionsRepository.default();
    updateAthleteAthleteGroup = new _UpdateAthleteAthleteGroupService.default(fakeAthletesRepository, fakeAthleteGroupsRepository);
  });
  it('should be able to update athlete\'s athlete group', async () => {
    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100
    });
    const athleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de testes',
      description: 'Descrição grupo de testes'
    });
    const newAthleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de testes - atualização de grupo do aluno',
      description: 'Descrição grupo de testes'
    });
    const athlete = await fakeAthletesRepository.create({
      name: 'Aluno de testes',
      phoneNumber: '1',
      birthDate: new Date(1992, 2, 2),
      subscription,
      athleteGroup
    });
    const updatedAthlete = await updateAthleteAthleteGroup.execute({
      athlete_id: athlete.id,
      athlete_group_id: newAthleteGroup.id
    });
    expect(updatedAthlete.id).toBe(athlete.id);
    expect(updatedAthlete.athleteGroup).toEqual(newAthleteGroup);
  });
  it('should throw an exception if athlete is not found', async () => {
    const athleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de testes',
      description: 'Descrição grupo de testes'
    });
    await expect(updateAthleteAthleteGroup.execute({
      athlete_id: 'id inválido',
      athlete_group_id: athleteGroup.id
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should throw an exception if ahtlete group is not found', async () => {
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
      birthDate: new Date(1992, 2, 2),
      subscription,
      athleteGroup
    });
    await expect(updateAthleteAthleteGroup.execute({
      athlete_id: athlete.id,
      athlete_group_id: 'id inválido'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});