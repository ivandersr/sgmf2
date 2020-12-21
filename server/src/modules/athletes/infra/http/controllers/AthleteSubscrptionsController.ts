import { Request, Response } from 'express';
import UpdateAthleteSubscriptionService from '@modules/athletes/services/UpdateAthleteSubscriptionService';

class AthleteSubscriptionsController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { subscription_id } = request.body;

    const updateAthleteSubscription = new UpdateAthleteSubscriptionService();

    const athlete = await updateAthleteSubscription.execute({
      athlete_id: id,
      subscription_id,
    });

    return response.status(200).json(athlete);
  }
}

export default AthleteSubscriptionsController;
