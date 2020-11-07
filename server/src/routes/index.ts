import { Router } from 'express';
import atheltesRouter from './athletes.routes';
import subscriptionsRouter from './subscriptions.routes';
import usersRouter from './users.routes';
import sessionsRouter from './session.routes';

const routes = Router();

routes.use('/athletes', atheltesRouter);
routes.use('/subscriptions', subscriptionsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
