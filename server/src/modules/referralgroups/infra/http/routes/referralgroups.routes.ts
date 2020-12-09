import { Router } from 'express';
import { getRepository } from 'typeorm';
import ReferralGroup from '@modules/referralgroups/infra/typeorm/entities/ReferralGroup';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import CreateReferralGroupService from '@modules/referralgroups/services/CreateReferralGroupService';

const referralGroupsRouter = Router();

referralGroupsRouter.use(ensureAuthenticated);

referralGroupsRouter.get('/', async (request, response) => {
  const referralGroupsRepository = getRepository(ReferralGroup);

  const referralGroups = await referralGroupsRepository.find();

  return response.json(referralGroups);
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
    return response.status(400).json({ error: err.messag });
  }
});

export default referralGroupsRouter;
