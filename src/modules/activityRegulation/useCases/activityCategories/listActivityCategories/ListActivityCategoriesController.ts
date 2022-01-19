import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListActivityCategoriesUseCase } from "./ListActivityCategoriesUseCase";

class ListActivityCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { page, registersPerPage, filter, isActive } = request.query;

    const listActivityCategoriesUseCase = container.resolve(
      ListActivityCategoriesUseCase,
    );

    const activityCategories = await listActivityCategoriesUseCase.execute({
      userId,
      page: Number(page),
      registersPerPage: Number(registersPerPage),
      filter: filter as string,
      isActive: isActive !== "false",
    });

    return response.status(200).json(activityCategories);
  }
}

export { ListActivityCategoriesController };
