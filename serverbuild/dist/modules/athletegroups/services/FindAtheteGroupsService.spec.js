"use strict";

var _FakeAthleteGroupsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAthleteGroupsRepository"));

var _FindAtheteGroupsService = _interopRequireDefault(require("./FindAtheteGroupsService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAthleteGroupsRepository;
let findAthleteGroups;
describe('FindAthleteGroupsService', () => {
  beforeEach(() => {
    fakeAthleteGroupsRepository = new _FakeAthleteGroupsRepository.default();
    findAthleteGroups = new _FindAtheteGroupsService.default(fakeAthleteGroupsRepository);
  });
  it('should list available athlete groups', async () => {
    const athleteGroup1 = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de alunos 1',
      description: 'Grupo de alunos 1 para testes'
    });
    const athleteGroup2 = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de alunos 2',
      description: 'Grupo de alunos 2 para testes'
    });
    const athleteGroups = await findAthleteGroups.execute();
    expect(athleteGroups).toEqual([athleteGroup1, athleteGroup2]);
  });
});