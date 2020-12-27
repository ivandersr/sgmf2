import FakeAthleteGroupsRepository from "@modules/athletegroups/repositories/fakes/FakeAthleteGroupsRepository";
import FakeAthletesRepository from "@modules/athletes/repositories/fakes/FakeAthletesRepository";
import FakeSubscriptionsRepository from "@modules/subscriptions/repositories/fakes/FakeSubscriptionsRepository";
import AppError from "@shared/errors/AppError";
import FakeReferralGroupsRepository from "../repositories/fakes/FakeReferralGroupsRepository";
import FindReferralGroupService from "./FindReferralGroupService";

let fakeAthletesRepository: FakeAthletesRepository;
let fakeAthleteGroupsRepository: FakeAthleteGroupsRepository;
let fakeSubscriptionsRepository: FakeSubscriptionsRepository;
let fakeReferralGroupsRepository: FakeReferralGroupsRepository;
let findReferralGroup: FindReferralGroupService;

describe('FindReferralGroupService', () => {
  beforeEach(() => {
    fakeAthletesRepository = new FakeAthletesRepository();
    fakeAthleteGroupsRepository = new FakeAthleteGroupsRepository();
    fakeSubscriptionsRepository = new FakeSubscriptionsRepository();
    fakeReferralGroupsRepository = new FakeReferralGroupsRepository();
    findReferralGroup = new FindReferralGroupService(
      fakeReferralGroupsRepository,
    )
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
      phoneNumber: '1',
      birthDate: new Date(1994, 1, 1),
      subscription,
      athleteGroup,
    });

    const referralGroup = await fakeReferralGroupsRepository.create({
      referral: athlete,
      title: 'Grupo de indicações de testes',
    });

    const findRefGroup = await findReferralGroup.execute({
      referral_group_id: referralGroup.id,
    });

    expect(findRefGroup).toEqual(referralGroup);
  });

  it('should throw an exception if referral group id is empty', async () => {
    await expect(
      findReferralGroup.execute({
        referral_group_id: ''
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw an exception if referral group is not found', async () => {
    await expect(
      findReferralGroup.execute({
        referral_group_id: 'id inválido',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
