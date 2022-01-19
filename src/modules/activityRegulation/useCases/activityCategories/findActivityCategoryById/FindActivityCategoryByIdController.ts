import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindActivityCategoryByIdUseCase } from "./FindActivityCategoryByIdUseCase";

class FindActivityCategoryByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const adminId = request.user.id;
    const { activityCategoryId } = request.query;

    const findActivityCategoryByIdUseCase = container.resolve(
      FindActivityCategoryByIdUseCase,
    );

    const activityCategory = await findActivityCategoryByIdUseCase.execute(
      adminId,
      String(activityCategoryId),
    );

    return response.json(activityCategory);
  }
}

export { FindActivityCategoryByIdController };
