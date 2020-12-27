import FakeAthleteGroupsRepository from "@modules/athletegroups/repositories/fakes/FakeAthleteGroupsRepository";
import FakeAthletesRepository from "@modules/athletes/repositories/fakes/FakeAthletesRepository";
import FakeSubscriptionsRepository from "@modules/subscriptions/repositories/fakes/FakeSubscriptionsRepository";
import FakeReferralGroupsRepository from "../repositories/fakes/FakeReferralGroupsRepository";
import ListReferralGroupsService from "./ListReferralGroupsService";

let fakeAthletesRepository: FakeAthletesRepository;
let fakeAthleteGroupsRepository: FakeAthleteGroupsRepository;
let fakeSubscriptionsRepository: FakeSubscriptionsRepository;
let fakeReferralGroupsRepository: FakeReferralGroupsRepository;
let listReferralGroups: ListReferralGroupsService;

describe('ListReferralGroupsService', () => {
  beforeEach(() => {
    fakeAthletesRepository = new FakeAthletesRepository();
    fakeAthleteGroupsRepository = new FakeAthleteGroupsRepository();
    fakeSubscriptionsRepository = new FakeSubscriptionsRepository();
    fakeReferralGroupsRepository = new FakeReferralGroupsRepository();
    listReferralGroups = new ListReferralGroupsService(
      fakeReferralGroupsRepository,
    );
  });

  it('should be able to list referral groups', async () => {
    const athleteGroup = await fakeAthleteGroupsRepository.create({
      title: 'Grupo de testes',
      description: 'Descrição grupo de testes',
    });

    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100,
    });

    const athlete = await fakeAthletesRepository.create({
      name: 'Aluno de testes',
      birthDate: new Date(1995, 1, 1),
      phoneNumber: '1',
      subscription,
      athleteGroup,
    });

    const referralGroup = await fakeReferralGroupsRepository.create({
      referral: athlete,
      title: 'Grupo de indicações de testes',
    });

    const findRefGroups = await listReferralGroups.execute();

    expect(findRefGroups).toEqual([referralGroup]);
  });
});
