import { Router } from 'express';
import { getRepository } from 'typeorm';
import { parseISO } from 'date-fns';
import Athlete from '@modules/athletes/infra/typeorm/entities/Athlete';
import CreateAthleteService from '@modules/athletes/services/CreateAthleteService';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const athletesRouter = Router();

athletesRouter.use(ensureAuthenticated);

athletesRouter.get('/', async (request, response) => {
  const athletesRepository = getRepository(Athlete);
  const athletes = await athletesRepository.find();
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
