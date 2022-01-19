import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListActivityCategoriesByInstitutionIdUseCase } from "./ListActivityCategoriesByInstitutionIdUseCase";

class ListActivityCategoriesByInstitutionIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const adminId = request.user.id;

    const listActivityCategoriesByInstitutionIdUseCase = container.resolve(
      ListActivityCategoriesByInstitutionIdUseCase,
    );

    const activityCategories =
      await listActivityCategoriesByInstitutionIdUseCase.execute(adminId);

    return response.status(200).json(activityCategories);
  }
}

export { ListActivityCategoriesByInstitutionIdController };
