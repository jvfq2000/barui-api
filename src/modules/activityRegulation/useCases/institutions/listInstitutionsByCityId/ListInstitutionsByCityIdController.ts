/* eslint-disable no-unused-expressions */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListInstitutionsByCityIdUseCase } from "./ListInstitutionsByCityIdUseCase";

class ListInstitutionsByCityIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { cityId } = request.query;

    const listInstitutionsByCityIdUseCase = container.resolve(
      ListInstitutionsByCityIdUseCase,
    );

    const institutions = await listInstitutionsByCityIdUseCase.execute(
      String(cityId),
    );

    return response.status(200).json(institutions);
  }
}

export { ListInstitutionsByCityIdController };
