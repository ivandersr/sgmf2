import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import AthleteGroupsController from '../controllers/AthleteGroupsController';

const athleteGroupsRouter = Router();
const athleteGroupsController = new AthleteGroupsController();

athleteGroupsRouter.use(ensureAuthenticated);

athleteGroupsRouter.get('/', athleteGroupsController.index);

athleteGroupsRouter.post('/', athleteGroupsController.create);

export default athleteGroupsRouter;
