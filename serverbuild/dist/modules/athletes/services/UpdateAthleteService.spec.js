"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeAthleteGroupsRepository = _interopRequireDefault(require("../../athletegroups/repositories/fakes/FakeAthleteGroupsRepository"));

var _FakeSubscriptionsRepository = _interopRequireDefault(require("../../subscriptions/repositories/fakes/FakeSubscriptionsRepository"));

var _FakeAthletesRepository = _interopRequireDefault(require("../repositories/fakes/FakeAthletesRepository"));

var _UpdateAthleteService = _interopRequireDefault(require("./UpdateAthleteService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAthletesRepository;
let fakeAthleteGroupsRepository;
let fakeSubscriptionsRepository;
let updateAthlete;
describe('UpdateAthleteService', () => {
  beforeEach(() => {
    fakeAthletesRepository = new _FakeAthletesRepository.default();
    fakeAthleteGroupsRepository = new _FakeAthleteGroupsRepository.default();
    fakeSubscriptionsRepository = new _FakeSubscriptionsRepository.default();
    updateAthlete = new _UpdateAthleteService.default(fakeAthletesRepository);
  });
  it('should be able to update athlete\'s details', async () => {
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
      birthDate: new Date(1995, 9, 9),
      subscription,
      athleteGroup
    });
    const updatedAthlete = await updateAthlete.execute({
      id: athlete.id,
      birthDate: '1995-10-25',
      name: 'Aluno de testes atualizado',
      phoneNumber: '2'
    });
    expect(updatedAthlete.birthDate).toEqual(new Date(1995, 9, 25));
    expect(updatedAthlete.name).toBe('Aluno de testes atualizado');
    expect(updatedAthlete.phoneNumber).toBe('2');
  });
  it('should throw an exception if athlete is not found', async () => {
    await expect(updateAthlete.execute({
      id: 'id inválido',
      name: 'teste',
      phoneNumber: 'teste',
      birthDate: '1995-10-25'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should throw an exception if name, phone number or birth date is missing', async () => {
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
      birthDate: new Date(1995, 9, 9),
      subscription,
      athleteGroup
    });
    await expect(updateAthlete.execute({
      id: athlete.id,
      name: '',
      phoneNumber: 'teste',
      birthDate: '1995-10-25'
    })).rejects.toBeInstanceOf(_AppError.default);
    await expect(updateAthlete.execute({
      id: athlete.id,
      name: 'teste',
      phoneNumber: '',
      birthDate: '1995-10-25'
    })).rejects.toBeInstanceOf(_AppError.default);
    await expect(updateAthlete.execute({
      id: athlete.id,
      name: 'teste',
      phoneNumber: 'teste',
      birthDate: ''
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});