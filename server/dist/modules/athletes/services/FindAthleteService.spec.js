"use strict";

var _FakeAthleteGroupsRepository = _interopRequireDefault(require("../../athletegroups/repositories/fakes/FakeAthleteGroupsRepository"));

var _FakeSubscriptionsRepository = _interopRequireDefault(require("../../subscriptions/repositories/fakes/FakeSubscriptionsRepository"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeAthletesRepository = _interopRequireDefault(require("../repositories/fakes/FakeAthletesRepository"));

var _FindAthleteService = _interopRequireDefault(require("./FindAthleteService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAthletesRepository;
let fakeAthleteGroupsRepository;
let fakeSubscriptionsRepository;
let findAthlete;
describe('FindAthleteService', () => {
  beforeEach(() => {
    fakeAthletesRepository = new _FakeAthletesRepository.default();
    fakeAthleteGroupsRepository = new _FakeAthleteGroupsRepository.default();
    fakeSubscriptionsRepository = new _FakeSubscriptionsRepository.default();
    findAthlete = new _FindAthleteService.default(fakeAthletesRepository);
  });
  it('should be able to find an athlete with a valid id', async () => {
    const athleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de alunos de testes',
      description: 'Descrição grupo de alunos para testes'
    });
    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100
    });
    const expectedAthlete = await fakeAthletesRepository.create({
      name: 'Aluno de testes',
      birthDate: new Date(1991, 6, 25),
      phoneNumber: '99999999',
      athleteGroup,
      subscription
    });
    const {
      id
    } = expectedAthlete;
    const athlete = await findAthlete.execute({
      id
    });
    expect(athlete).toBe(expectedAthlete);
  });
  it('should not be able to find an athlete without its id', async () => {
    await expect(findAthlete.execute({
      id: ''
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should return 404 error when athlete is not found', async () => {
    await expect(findAthlete.execute({
      id: 'id inválido'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});