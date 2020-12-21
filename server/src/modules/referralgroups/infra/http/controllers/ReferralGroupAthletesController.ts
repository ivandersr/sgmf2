import ListAthletesByReferralGroupService from '@modules/athletes/services/ListAthletesByReferralGroupService';
import { Request, Response } from 'express';

class ReferralGroupAthletesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listByReferralGroup = new ListAthletesByReferralGroupService();

    const activeByReferral = await listByReferralGroup.execute({
      referral_group_id: id,
    });

    return response.status(200).json(activeByReferral);
  }
}

export default ReferralGroupAthletesController;
