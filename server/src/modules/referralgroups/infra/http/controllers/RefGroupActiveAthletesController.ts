import ListActiveAthletesByReferralGroupService from '@modules/athletes/services/ListActiveAthletesByReferralGroupService';
import { Request, Response } from 'express';

class RefGroupActiveAthletesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listActiveByReferral = new ListActiveAthletesByReferralGroupService();

    const athletesByReferral = await listActiveByReferral.execute({
      referral_group_id: id,
    });

    return response.status(200).json(athletesByReferral);
  }
}

export default RefGroupActiveAthletesController;
