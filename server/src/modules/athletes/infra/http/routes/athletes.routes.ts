import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import CreateAthleteService from '@modules/athletes/services/CreateAthleteService';
import ListAthletesService from '@modules/athletes/services/ListAthletesService';
import FindAthleteService from '@modules/athletes/services/FindAthleteService';
import UpdateAthleteService from '@modules/athletes/services/UpdateAthleteService';
import UpdateAthleteReferralGroupService from '@modules/athletes/services/UpdateAthleteReferralGroupService';

const athletesRouter = Router();

athletesRouter.use(ensureAuthenticated);

athletesRouter.get('/', async (request, response) => {
  const listAthletes = new ListAthletesService();
  const { page, pageSize } = request.query;

  const athletes = await listAthletes.execute({
    page: String(page),
    pageSize: String(pageSize),
  });

  return response.status(200).json(athletes);
});

athletesRouter.get('/:id', async (request, response) => {
  const findAthlete = new FindAthleteService();
  const { id } = request.params;

  const athlete = await findAthlete.execute({
    id,
  });

  return response.status(200).json(athlete);
});

athletesRouter.post('/', async (request, response) => {
  const {
    name,
    birthDate,
    phoneNumber,
    subscription_id,
    athlete_group_id,
  } = request.body;

  const createAthleteService = new CreateAthleteService();
  const athlete = await createAthleteService.execute({
    name,
    birthDate,
    phoneNumber,
    subscription_id,
    athlete_group_id,
  });

  return response.status(201).json(athlete);
});

athletesRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { name, birthDate, phoneNumber } = request.body;

  const updateAthlete = new UpdateAthleteService();

  const updatedAthlete = await updateAthlete.execute({
    id,
    name,
    birthDate,
    phoneNumber,
  });

  return response.status(200).json(updatedAthlete);
});

athletesRouter.put('/referral/:id', async (request, response) => {
  const { id } = request.params;
  const { referralGroupId } = request.body;

  const updateReferral = new UpdateAthleteReferralGroupService();

  const updatedAthlete = await updateReferral.execute({
    id,
    referralGroupId,
  });

  return response.status(200).json(updatedAthlete);
});

export default athletesRouter;
