"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeAthleteGroupsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAthleteGroupsRepository"));

var _CreateAthleteGroupService = _interopRequireDefault(require("./CreateAthleteGroupService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAthleteGroupsRepository;
let createAthleteGroup;
describe('CreateAthleteGroupsService', () => {
  beforeEach(() => {
    fakeAthleteGroupsRepository = new _FakeAthleteGroupsRepository.default();
    createAthleteGroup = new _CreateAthleteGroupService.default(fakeAthleteGroupsRepository);
  });
  it('should be able to create a new athlete group', async () => {
    const athleteGroup = await createAthleteGroup.execute({
      title: 'Título de teste para grupo de alunos',
      description: 'Descrição de teste para grupo de alunos'
    });
    expect(athleteGroup).toHaveProperty('id');
    expect(athleteGroup.title).toBe('Título de teste para grupo de alunos');
    expect(athleteGroup.description).toBe('Descrição de teste para grupo de alunos');
  });
  it('should not be able to create a new athlete group without a title', async () => {
    await expect(createAthleteGroup.execute({
      title: '',
      description: 'Descrição de teste para grupo de alunos'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create a new athlete group without a description', async () => {
    await expect(createAthleteGroup.execute({
      title: 'Título de teste para grupo de alunos',
      description: ''
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});