import FindAthletesByNameService from "@modules/athletes/services/FindAthletesByNameService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class AthletesFilterController {
  public async find(request: Request, response: Response): Promise<Response> {
    const { text } = request.body;
    const { page, pageSize } = request.query;

    const filterAthletes = container.resolve(FindAthletesByNameService);

    const athletes = await filterAthletes.execute({
      text,
      page: String(page),
      pageSize: String(pageSize),
    });

    return response.status(200).json(athletes);
  }
}

export default AthletesFilterController;
