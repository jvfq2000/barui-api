import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateInstitutionUseCase } from "./UpdateInstitutionUseCase";

class UpdateInstitutionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { institutionId } = request.query;
    const { name, cityId } = request.body;

    const updateInstitutionUseCase = container.resolve(
      UpdateInstitutionUseCase,
    );

    const institution = await updateInstitutionUseCase.execute({
      id: String(institutionId),
      name,
      cityId,
    });

    return response.json(institution);
  }
}

export { UpdateInstitutionController };
