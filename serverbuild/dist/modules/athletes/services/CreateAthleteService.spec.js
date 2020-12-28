"use strict";

var _FakeAthleteGroupsRepository = _interopRequireDefault(require("../../athletegroups/repositories/fakes/FakeAthleteGroupsRepository"));

var _FakeSubscriptionsRepository = _interopRequireDefault(require("../../subscriptions/repositories/fakes/FakeSubscriptionsRepository"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeAthletesRepository = _interopRequireDefault(require("../repositories/fakes/FakeAthletesRepository"));

var _CreateAthleteService = _interopRequireDefault(require("./CreateAthleteService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAthletesRepository;
let fakeSubscriptionsRepository;
let fakeAthleteGroupsRepository;
let createAthlete;
describe('CreateAthleteService', () => {
  beforeEach(() => {
    fakeAthletesRepository = new _FakeAthletesRepository.default();
    fakeSubscriptionsRepository = new _FakeSubscriptionsRepository.default();
    fakeAthleteGroupsRepository = new _FakeAthleteGroupsRepository.default();
    createAthlete = new _CreateAthleteService.default(fakeAthletesRepository, fakeSubscriptionsRepository, fakeAthleteGroupsRepository);
  });
  it('should be able to create a new athlete', async () => {
    const athleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de alunos de testes',
      description: 'Descrição grupo de alunos para testes'
    });
    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100
    });
    const athlete = await createAthlete.execute({
      name: 'Aluno de testes',
      birthDate: '1991-07-25',
      phoneNumber: '99999999',
      athlete_group_id: athleteGroup.id,
      subscription_id: subscription.id
    });
    const expectedBirthDate = new Date(1991, 6, 25);
    expect(athlete).toHaveProperty('id');
    expect(athlete.name).toBe('Aluno de testes');
    expect(athlete.subscription).toEqual(subscription);
    expect(athlete.birthDate).toEqual(expectedBirthDate);
  });
  it('should not be able to create an athlete without name', async () => {
    await expect(createAthlete.execute({
      name: '',
      birthDate: '1991-07-25',
      phoneNumber: '99999999',
      athlete_group_id: '',
      subscription_id: ''
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an athlete without birth date', async () => {
    await expect(createAthlete.execute({
      name: 'Aluno de testes',
      birthDate: '',
      phoneNumber: '99999999',
      athlete_group_id: '',
      subscription_id: ''
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an athlete without phone number', async () => {
    await expect(createAthlete.execute({
      name: 'Aluno de testes',
      birthDate: '1991-07-25',
      phoneNumber: '',
      athlete_group_id: '',
      subscription_id: ''
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an athlete without athlete group id', async () => {
    await expect(createAthlete.execute({
      name: 'Aluno de testes',
      birthDate: '1991-07-25',
      phoneNumber: '99999999',
      athlete_group_id: '',
      subscription_id: 'id de teste'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an athlete without athlete group id', async () => {
    const athleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de alunos de testes',
      description: 'Descrição grupo de alunos para testes'
    });
    await expect(createAthlete.execute({
      name: 'Aluno de testes',
      birthDate: '1991-07-25',
      phoneNumber: '99999999',
      athlete_group_id: athleteGroup.id,
      subscription_id: ''
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an athlete with invalid subscription id', async () => {
    const athleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de alunos de testes',
      description: 'Descrição grupo de alunos para testes'
    });
    await expect(createAthlete.execute({
      name: 'Aluno de testes',
      birthDate: '1991-07-25',
      phoneNumber: '99999999',
      athlete_group_id: athleteGroup.id,
      subscription_id: 'id inválido'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an athlete with invalid athlete group id', async () => {
    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100
    });
    await expect(createAthlete.execute({
      name: 'Aluno de testes',
      birthDate: '1991-07-25',
      phoneNumber: '99999999',
      athlete_group_id: 'id inválido',
      subscription_id: subscription.id
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});