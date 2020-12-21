import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAthleteGroupService from '@modules/athletegroups/services/CreateAthleteGroupService';
import FindAthleteGroupsService from '@modules/athletegroups/services/FindAtheteGroupsService';

class AthleteGroupsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const findAthleteGroups = container.resolve(FindAthleteGroupsService);

    const athleteGroups = await findAthleteGroups.execute();

    return response.status(200).json(athleteGroups);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, description } = request.body;

    const createAthleteGroup = container.resolve(CreateAthleteGroupService);

    const athleteGroup = await createAthleteGroup.execute({
      title,
      description,
    });

    return response.status(201).json(athleteGroup);
  }
}

export default AthleteGroupsController;
