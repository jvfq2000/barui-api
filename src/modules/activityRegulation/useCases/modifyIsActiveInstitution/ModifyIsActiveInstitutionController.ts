import { Request, Response } from "express";
import { container } from "tsyringe";

import { ModifyIsActiveInstitutionUseCase } from "./ModifyIsActiveInstitutionUseCase";

class ModifyIsActiveInstitutionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { institutionId } = request.query;

    const modifyIsActiveInstitutionUseCase = container.resolve(
      ModifyIsActiveInstitutionUseCase,
    );

    await modifyIsActiveInstitutionUseCase.execute(String(institutionId));

    return response.status(204).send();
  }
}

export { ModifyIsActiveInstitutionController };
