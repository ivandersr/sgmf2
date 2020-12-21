import { Router } from 'express';
import { getRepository } from 'typeorm';
import ReferralGroup from '@modules/referralgroups/infra/typeorm/entities/ReferralGroup';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import CreateReferralGroupService from '@modules/referralgroups/services/CreateReferralGroupService';
import ListAthletesByReferralGroupService from '@modules/athletes/services/ListAthletesByReferralGroupService';
import ListActiveAthletesByReferralGroupService from '@modules/athletes/services/ListActiveAthletesByReferralGroupService';

const referralGroupsRouter = Router();

referralGroupsRouter.use(ensureAuthenticated);

referralGroupsRouter.get('/', async (request, response) => {
  const referralGroupsRepository = getRepository(ReferralGroup);

  const referralGroups = await referralGroupsRepository.find();

  return response.json(referralGroups);
});

referralGroupsRouter.get('/:id/all', async (request, response) => {
  const { id } = request.params;

  const listByReferralGroup = new ListAthletesByReferralGroupService();

  const activeByReferral = await listByReferralGroup.execute({
    referralGroupId: id,
  });

  return response.status(200).json(activeByReferral);
});

referralGroupsRouter.get('/:id/active', async (request, response) => {
  const { id } = request.params;

  const listActiveByReferral = new ListActiveAthletesByReferralGroupService();

  const athletesByReferral = await listActiveByReferral.execute({
    referral_group_id: id,
  });

  return response.status(200).json(athletesByReferral);
});

referralGroupsRouter.post('/', async (request, response) => {
  try {
    const { referral_id } = request.body;

    const createReferralGroup = new CreateReferralGroupService();

    const referralGroup = await createReferralGroup.execute({
      referral_id,
    });

    return response.status(201).json(referralGroup);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default referralGroupsRouter;
