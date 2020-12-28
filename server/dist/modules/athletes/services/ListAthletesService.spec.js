"use strict";

var _FakeAthleteGroupsRepository = _interopRequireDefault(require("../../athletegroups/repositories/fakes/FakeAthleteGroupsRepository"));

var _FakeSubscriptionsRepository = _interopRequireDefault(require("../../subscriptions/repositories/fakes/FakeSubscriptionsRepository"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeAthletesRepository = _interopRequireDefault(require("../repositories/fakes/FakeAthletesRepository"));

var _ListAthletesService = _interopRequireDefault(require("./ListAthletesService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAthletesRepository;
let fakeAthleteGroupsRepository;
let fakeSubscriptionsRepository;
let listAthletes;
let athletes;
describe('ListAthletesService', () => {
  beforeEach(() => {
    fakeAthletesRepository = new _FakeAthletesRepository.default();
    fakeAthleteGroupsRepository = new _FakeAthleteGroupsRepository.default();
    fakeSubscriptionsRepository = new _FakeSubscriptionsRepository.default();
    listAthletes = new _ListAthletesService.default(fakeAthletesRepository);
    athletes = [];
  });
  it('should be able to list athletes', async () => {
    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100
    });
    const athleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de testes',
      description: 'Descrição grupo de testes'
    });
    const athlete1 = await fakeAthletesRepository.create({
      name: 'Aluno de testes',
      phoneNumber: '1',
      birthDate: new Date(1992, 2, 2),
      subscription,
      athleteGroup
    });
    const athlete2 = await fakeAthletesRepository.create({
      name: 'Aluno de testes',
      phoneNumber: '1',
      birthDate: new Date(1992, 2, 2),
      subscription,
      athleteGroup
    });
    athletes.push(athlete1, athlete2);
    const findAthletes = await listAthletes.execute({
      page: '0',
      pageSize: '1'
    });
    expect(findAthletes).toEqual({
      athletes,
      total: 2,
      pages: 2
    });
  });
  it('should return full list if page or pageSize is empty', async () => {
    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100
    });
    const athleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de testes',
      description: 'Descrição grupo de testes'
    });
    const athlete1 = await fakeAthletesRepository.create({
      name: 'Aluno de testes',
      phoneNumber: '1',
      birthDate: new Date(1992, 2, 2),
      subscription,
      athleteGroup
    });
    const athlete2 = await fakeAthletesRepository.create({
      name: 'Aluno de testes',
      phoneNumber: '1',
      birthDate: new Date(1992, 2, 2),
      subscription,
      athleteGroup
    });
    athletes.push(athlete1, athlete2);
    const findAthletes = await listAthletes.execute({
      page: '',
      pageSize: '2'
    });
    expect(findAthletes).toEqual({
      athletes,
      total: 2,
      pages: 1
    });
  });
  it('should not be able to return list with non-numeric page or pageSize', async () => {
    await expect(listAthletes.execute({
      page: '1',
      pageSize: 'non-numeric'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});