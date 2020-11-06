import { Router } from 'express';
import atheltesRouter from './athletes.routes';
import subscriptionsRouter from './subscriptions.routes';

const routes = Router();

routes.use('/athletes', atheltesRouter);
routes.use('/subscriptions', subscriptionsRouter);

export default routes;
