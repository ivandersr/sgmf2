import { Router } from 'express';
import { parseISO } from 'date-fns';
import AthletesRepository from '../repositories/AthletesRepository';
import CreateAthleteService from '../services/CreateAthleteService';

const athletesRouter = Router();

const athletesRepository = new AthletesRepository();
const createAthleteService = new CreateAthleteService(athletesRepository);

athletesRouter.get('/', (request, response) => {
  const athletes = athletesRepository.all();
  return response.json(athletes);
});

athletesRouter.post('/', (request, response) => {
  const { name, birthDate } = request.body;

  const parsedBirthDate = parseISO(birthDate);

  const athlete = createAthleteService.execute({
    name,
    birthDate: parsedBirthDate,
  })

  return response.status(201).json(athlete);
})

export default athletesRouter;
