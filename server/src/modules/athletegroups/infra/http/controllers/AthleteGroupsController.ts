import CreateAthleteGroupService from '@modules/athletegroups/services/CreateAthleteGroupService';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import AthleteGroup from '../../typeorm/entities/AthleteGroup';

class AthleteGroupsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const athleteGroupsRepository = getRepository(AthleteGroup);

    const athleteGroups = await athleteGroupsRepository.find();

    return response.json(athleteGroups);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, description } = request.body;

    const createAthleteGroup = new CreateAthleteGroupService();

    const athleteGroup = await createAthleteGroup.execute({
      title,
      description,
    });

    return response.status(201).json(athleteGroup);
  }
}

export default AthleteGroupsController;
