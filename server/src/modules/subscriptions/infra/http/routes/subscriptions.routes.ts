import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import SubscriptionsController from '../SubscriptionsController';

const subscriptionsRouter = Router();
const subscriptionsController = new SubscriptionsController();

subscriptionsRouter.use(ensureAuthenticated);
subscriptionsRouter.get('/', subscriptionsController.index);
subscriptionsRouter.post('/', subscriptionsController.create);
subscriptionsRouter.put('/', subscriptionsController.update);

export default subscriptionsRouter;
