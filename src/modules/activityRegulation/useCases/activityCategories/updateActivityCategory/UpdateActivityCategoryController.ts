import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateActivityCategoryUseCase } from "./UpdateActivityCategoryUseCase";

class UpdateActivityCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const adminId = request.user.id;
    const { activityCategoryId } = request.query;
    const { name } = request.body;

    const updateActivityCategoryUseCase = container.resolve(
      UpdateActivityCategoryUseCase,
    );

    const activityCategory = await updateActivityCategoryUseCase.execute(
      adminId,
      {
        id: String(activityCategoryId),
        name,
      },
    );

    return response.json(activityCategory);
  }
}

export { UpdateActivityCategoryController };
