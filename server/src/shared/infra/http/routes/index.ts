import { Router } from 'express';
import atheltesRouter from '@modules/athletes/infra/http/routes/athletes.routes';
import subscriptionsRouter from '@modules/subscriptions/infra/http/routes/subscriptions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import athleteGroupsRouter from '@modules/athletegroups/infra/http/routes/athletegroups.routes';
import referralGroupsRouter from '@modules/referralgroups/infra/http/routes/referralgroups.routes';
import paymentsRouter from '@modules/payments/infra/http/routes/payments.routes';

const routes = Router();

routes.use('/athletes', atheltesRouter);
routes.use('/subscriptions', subscriptionsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/athletegroups', athleteGroupsRouter);
routes.use('/referralgroups', referralGroupsRouter);
routes.use('/payments', paymentsRouter);

export default routes;
