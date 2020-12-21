import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import CreateAthleteService from '@modules/athletes/services/CreateAthleteService';
import ListAthletesService from '@modules/athletes/services/ListAthletesService';
import FindAthleteService from '@modules/athletes/services/FindAthleteService';
import UpdateAthleteService from '@modules/athletes/services/UpdateAthleteService';
import UpdateAthleteReferralGroupService from '@modules/athletes/services/UpdateAthleteReferralGroupService';
import UpdateAthleteActiveFieldService from '@modules/athletes/services/UpdateAthleteActiveFieldService';
import UpdateAthleteSubscriptionService from '@modules/athletes/services/UpdateAthleteSubscriptionService';
import UpdateAthleteAthleteGroupService from '@modules/athletes/services/UpdateAthleteAthleteGroupService';

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
  const { referral_group_id } = request.body;

  const updateReferral = new UpdateAthleteReferralGroupService();

  const updatedAthlete = await updateReferral.execute({
    id,
    referral_group_id,
  });

  return response.status(200).json(updatedAthlete);
});

athletesRouter.put('/active/:id', async (request, response) => {
  const { id } = request.params;
  const { active } = request.body;

  const updateAthleteActiveField = new UpdateAthleteActiveFieldService();

  const athlete = await updateAthleteActiveField.execute({
    athlete_id: id,
    active,
  });

  return response.status(200).json(athlete);
});

athletesRouter.put('/subscription/:id', async (request, response) => {
  const { id } = request.params;
  const { subscription_id } = request.body;

  const updateAthleteSubscription = new UpdateAthleteSubscriptionService();

  const athlete = await updateAthleteSubscription.execute({
    athlete_id: id,
    subscription_id,
  });

  return response.status(200).json(athlete);
});

athletesRouter.put('/group/:id', async (request, response) => {
  const { id } = request.params;
  const { athlete_group_id } = request.body;

  const updateAthleteAthleteGroup = new UpdateAthleteAthleteGroupService();

  const athlete = await updateAthleteAthleteGroup.execute({
    athlete_id: id,
    athlete_group_id,
  });

  return response.status(200).json(athlete);
});

export default athletesRouter;
