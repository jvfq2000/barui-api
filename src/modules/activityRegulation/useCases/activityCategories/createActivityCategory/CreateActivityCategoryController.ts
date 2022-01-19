import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateActivityCategoryUseCase } from "./CreateActivityCategoryUseCase";

class CreateActivityCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const adminId = request.user.id;
    const { name } = request.body;

    const createActivityCategoryUseCase = container.resolve(
      CreateActivityCategoryUseCase,
    );

    await createActivityCategoryUseCase.execute(adminId, { name });

    return response.status(201).send();
  }
}

export { CreateActivityCategoryController };
