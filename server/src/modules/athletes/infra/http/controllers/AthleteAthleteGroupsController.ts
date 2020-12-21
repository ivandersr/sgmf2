import { Request, Response } from 'express';
import UpdateAthleteAthleteGroupService from '@modules/athletes/services/UpdateAthleteAthleteGroupService';

class AthleteAthleteGroupsController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { athlete_group_id } = request.body;

    const updateAthleteAthleteGroup = new UpdateAthleteAthleteGroupService();

    const athlete = await updateAthleteAthleteGroup.execute({
      athlete_id: id,
      athlete_group_id,
    });

    return response.status(200).json(athlete);
  }
}

export default AthleteAthleteGroupsController;
