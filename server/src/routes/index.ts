import { Router } from 'express';
import atheltesRouter from './athletes.routes';
import subscriptionsRouter from './subscriptions.routes';
import usersRouter from './users.routes';
import sessionsRouter from './session.routes';
import athleteGroupsRouter from './athletegroups.routes';
import referralGroupsRouter from './referralgroups.routes';

const routes = Router();

routes.use('/athletes', atheltesRouter);
routes.use('/subscriptions', subscriptionsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/athletegroups', athleteGroupsRouter);
routes.use('/referralgroups', referralGroupsRouter);

export default routes;
