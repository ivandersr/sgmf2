import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ListAthletesByReferralGroupService from '@modules/athletes/services/ListAthletesByReferralGroupService';
import ListActiveAthletesByReferralGroupService from '@modules/athletes/services/ListActiveAthletesByReferralGroupService';
import ReferralGroupsController from '../controllers/ReferralGroupsController';

const referralGroupsRouter = Router();
const referralGroupsController = new ReferralGroupsController();

referralGroupsRouter.use(ensureAuthenticated);

referralGroupsRouter.get('/', referralGroupsController.index);

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

referralGroupsRouter.post('/', referralGroupsController.create);

export default referralGroupsRouter;
