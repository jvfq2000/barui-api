import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateInstitutionUseCase } from "./CreateInstitutionUseCase";

class CreateInstitutionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, cityId } = request.body;

    const createInstitutionUseCase = container.resolve(
      CreateInstitutionUseCase,
    );

    await createInstitutionUseCase.execute({ name, cityId });

    return response.status(201).send();
  }
}

export { CreateInstitutionController };
