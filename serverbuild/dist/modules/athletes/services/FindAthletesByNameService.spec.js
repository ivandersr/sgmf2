"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeAthleteGroupsRepository = _interopRequireDefault(require("../../athletegroups/repositories/fakes/FakeAthleteGroupsRepository"));

var _FakeSubscriptionsRepository = _interopRequireDefault(require("../../subscriptions/repositories/fakes/FakeSubscriptionsRepository"));

var _FakeAthletesRepository = _interopRequireDefault(require("../repositories/fakes/FakeAthletesRepository"));

var _FindAthletesByNameService = _interopRequireDefault(require("./FindAthletesByNameService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAthletesRepository;
let fakeAthleteGroupsRepository;
let fakeSubscriptionsRepository;
let findAthletesByName;
let athletes;
describe('FindAthletesByNameService', () => {
  beforeEach(() => {
    fakeAthletesRepository = new _FakeAthletesRepository.default();
    fakeAthleteGroupsRepository = new _FakeAthleteGroupsRepository.default();
    fakeSubscriptionsRepository = new _FakeSubscriptionsRepository.default();
    findAthletesByName = new _FindAthletesByNameService.default(fakeAthletesRepository);
    athletes = [];
  });
  it('should list athletes with name like the search term', async () => {
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
      birthDate: new Date(1994, 1, 1),
      subscription,
      athleteGroup
    });
    athletes.push(athlete);
    const findAthletes = await findAthletesByName.execute({
      text: 'de t',
      page: '0',
      pageSize: '1'
    });
    expect(findAthletes).toEqual({
      athletes,
      total: 1,
      pages: 1
    });
  });
  it('should throw an exception if page or pageSize isn\'t numeric', async () => {
    await expect(findAthletesByName.execute({
      text: 'test',
      page: '0',
      pageSize: 'non-numeric'
    })).rejects.toBeInstanceOf(_AppError.default);
    await expect(findAthletesByName.execute({
      text: 'test',
      page: 'non-numeric',
      pageSize: '0'
    })).rejects.toBeInstanceOf(_AppError.default);
    await expect(findAthletesByName.execute({
      text: '',
      page: '0',
      pageSize: 'non-numeric'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should return all athletes if search term is empty', async () => {
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
      birthDate: new Date(1994, 1, 1),
      subscription,
      athleteGroup
    });
    athletes.push(athlete);
    const findAthletes = await findAthletesByName.execute({
      text: '',
      page: '0',
      pageSize: '1'
    });
    expect(findAthletes).toEqual({
      athletes,
      total: 1,
      pages: 1
    });
  });
  it('should list all athletes in same page if search term and page or ' + 'pageSize are empty', async () => {
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
      birthDate: new Date(1994, 1, 1),
      subscription,
      athleteGroup
    });
    athletes.push(athlete);
    const findAthletes = await findAthletesByName.execute({
      text: '',
      page: '',
      pageSize: '1'
    });
    expect(findAthletes).toEqual({
      athletes,
      total: 1,
      pages: 1
    });
  });
  it('should list all athletes in same page when searched by name with ' + 'empty page or pageSize', async () => {
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
      birthDate: new Date(1994, 1, 1),
      subscription,
      athleteGroup
    });
    athletes.push(athlete);
    const findAthletes = await findAthletesByName.execute({
      text: 'de t',
      page: '',
      pageSize: '1'
    });
    expect(findAthletes).toEqual({
      athletes,
      total: 1,
      pages: 1
    });
  });
});