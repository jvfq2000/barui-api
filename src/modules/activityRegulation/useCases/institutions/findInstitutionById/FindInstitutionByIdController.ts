import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindInstitutionByIdUseCase } from "./FindInstitutionByIdUseCase";

class FindInstitutionByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { institutionId } = request.query;

    const findInstitutionByIdUseCase = container.resolve(
      FindInstitutionByIdUseCase,
    );

    const institution = await findInstitutionByIdUseCase.execute(
      String(institutionId),
    );

    return response.json(institution);
  }
}

export { FindInstitutionByIdController };
