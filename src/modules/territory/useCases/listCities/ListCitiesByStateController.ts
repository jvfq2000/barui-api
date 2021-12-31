import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCitiesByStateUseCase } from "./ListCitiesByStateUseCase";

class ListCitiesByStateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { stateId } = request.query;

    const listCitiesByStateUseCase = container.resolve(
      ListCitiesByStateUseCase,
    );

    const cities = await listCitiesByStateUseCase.execute(String(stateId));

    return response.json(cities);
  }
}

export { ListCitiesByStateController };
