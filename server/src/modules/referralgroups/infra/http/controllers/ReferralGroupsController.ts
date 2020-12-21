import CreateReferralGroupService from '@modules/referralgroups/services/CreateReferralGroupService';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import ReferralGroup from '../../typeorm/entities/ReferralGroup';

class ReferralGroupsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const referralGroupsRepository = getRepository(ReferralGroup);

    const referralGroups = await referralGroupsRepository.find();

    return response.json(referralGroups);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { referral_id } = request.body;

    const createReferralGroup = new CreateReferralGroupService();

    const referralGroup = await createReferralGroup.execute({
      referral_id,
    });

    return response.status(201).json(referralGroup);
  }
}

export default ReferralGroupsController;
