import { Request, Response } from "express";
import { container } from "tsyringe";

import { ModifyIsActiveActivityCategoryUseCase } from "./ModifyIsActiveActivityCategoryUseCase";

class ModifyIsActiveActivityCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const adminId = request.user.id;
    const { activityCategoryId } = request.query;

    const modifyIsActiveActivityCategoryUseCase = container.resolve(
      ModifyIsActiveActivityCategoryUseCase,
    );

    await modifyIsActiveActivityCategoryUseCase.execute(
      adminId,
      String(activityCategoryId),
    );

    return response.status(204).send();
  }
}

export { ModifyIsActiveActivityCategoryController };
