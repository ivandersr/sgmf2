import { Router } from 'express';
import { getRepository } from 'typeorm';
import AthleteGroup from '../models/AthleteGroup';
import CreateAthleteGroupService from '../services/CreateAthleteGroupService';

const athleteGroupsRouter = Router();

athleteGroupsRouter.get('/', async (request, response) => {
  const athleteGroupsRepository = getRepository(AthleteGroup);

  const athleteGroups = await athleteGroupsRepository.find();

  return response.json(athleteGroups);
});

athleteGroupsRouter.post('/', async (request, response) => {
  try {
    const { title, description } = request.body;

    const createAthleteGroup = new CreateAthleteGroupService();

    const athleteGroup = await createAthleteGroup.execute({
      title,
      description,
    });

    return response.status(201).json(athleteGroup);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default athleteGroupsRouter;
