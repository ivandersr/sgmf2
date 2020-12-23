import FakeAthleteGroupsRepository from "../repositories/fakes/FakeAthleteGroupsRepository"
import CreateAthleteGroupService from './CreateAthleteGroupService';

let fakeAthleteGroupsRepository: FakeAthleteGroupsRepository;
let createAthleteGroup: CreateAthleteGroupService;

describe('CreateAthleteGroupsService', () => {
  beforeEach(() => {
    fakeAthleteGroupsRepository = new FakeAthleteGroupsRepository();
    createAthleteGroup = new CreateAthleteGroupService(
      fakeAthleteGroupsRepository
    );
  });

  it('should be able to create a new athlete group', async () => {
    const athleteGroup = await createAthleteGroup.execute({
      title: 'Título de teste para grupo de alunos',
      description: 'Descrição de teste para grupo de alunos',
    });

    expect(athleteGroup).toHaveProperty('id');
    expect(athleteGroup.title).toBe('Título de teste para grupo de alunos');
    expect(athleteGroup.description).toBe(
      'Descrição de teste para grupo de alunos'
    );
  })
})
