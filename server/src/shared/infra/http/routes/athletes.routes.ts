import { Router } from 'express';
import { parseISO } from 'date-fns';
import CreateAthleteService from '@modules/athletes/services/CreateAthleteService';
import FindAthletesService from '@modules/athletes/services/FindAthletesService';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const athletesRouter = Router();

athletesRouter.use(ensureAuthenticated);

athletesRouter.get('/', async (request, response) => {
  const findAthletes = new FindAthletesService();
  const { page, pageSize } = request.query;

  const athletes = await findAthletes.execute({
    page: String(page),
    pageSize: String(pageSize),
  })

  return response.json(athletes);
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
