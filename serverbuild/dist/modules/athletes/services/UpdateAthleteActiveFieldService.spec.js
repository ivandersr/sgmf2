"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeSubscriptionsRepository = _interopRequireDefault(require("../../subscriptions/repositories/fakes/FakeSubscriptionsRepository"));

var _FakeAthleteGroupsRepository = _interopRequireDefault(require("../../athletegroups/repositories/fakes/FakeAthleteGroupsRepository"));

var _FakeAthletesRepository = _interopRequireDefault(require("../repositories/fakes/FakeAthletesRepository"));

var _UpdateAthleteActiveFieldService = _interopRequireDefault(require("./UpdateAthleteActiveFieldService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAthletesRepository;
let fakeSubscriptionsRepository;
let fakeAthleteGroupsRepository;
let updateAthleteActiveField;
describe('UpdateAthleteActiveFieldService', () => {
  beforeEach(() => {
    fakeAthletesRepository = new _FakeAthletesRepository.default();
    fakeSubscriptionsRepository = new _FakeSubscriptionsRepository.default();
    fakeAthleteGroupsRepository = new _FakeAthleteGroupsRepository.default();
    updateAthleteActiveField = new _UpdateAthleteActiveFieldService.default(fakeAthletesRepository);
  });
  it('should be able to update athlete\'s active status', async () => {
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
    const updatedAthlete = await updateAthleteActiveField.execute({
      active: false,
      athlete_id: athlete.id
    });
    expect(updatedAthlete.active).toBeFalsy();
  });
  it('should throw an exception if athlete is not found', async () => {
    await expect(updateAthleteActiveField.execute({
      active: false,
      athlete_id: 'id inválido'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});