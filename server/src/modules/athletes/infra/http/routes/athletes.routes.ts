import { Router } from 'express';
import { parseISO } from 'date-fns';
import CreateAthleteService from '@modules/athletes/services/CreateAthleteService';
import ListAthletesService from '@modules/athletes/services/ListAthletesService';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import FindAthleteService from '@modules/athletes/services/FindAthleteService';

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

  const parsedBirthDate = parseISO(birthDate);

  try {
    const createAthleteService = new CreateAthleteService();
    const athlete = await createAthleteService.execute({
      name,
      birthDate: parsedBirthDate,
      phoneNumber,
      subscription_id,
      athlete_group_id,
    });

    return response.status(201).json(athlete);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default athletesRouter;
