import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated'
import PaymentsByDateAndAthleteController from '../controllers/PaymentsByDateAndAthleteController';
import PaymentsByDateController from '../controllers/PaymentsByDateController';
import PaymentsController from '../controllers/PaymentsController';

const paymentsRouter = Router();
const paymentsController = new PaymentsController();
const byDateController = new PaymentsByDateController();
const byDateAndAthleteController = new PaymentsByDateAndAthleteController();

paymentsRouter.use(ensureAuthenticated);
paymentsRouter.post('/', paymentsController.create);
paymentsRouter.get('/byathlete', paymentsController.find);
paymentsRouter.get('/bydate', byDateController.find);
paymentsRouter.get('/bydateandathlete', byDateAndAthleteController.find);

export default paymentsRouter;
