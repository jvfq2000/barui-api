import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateChartUseCase } from "./CreateChartUseCase";

class CreateChartController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { name, inForceFrom, courseId, activities } = request.body;

    const createChartUseCase = container.resolve(CreateChartUseCase);

    await createChartUseCase.execute(userId, {
      name,
      inForceFrom,
      courseId,
      activities,
    });

    return response.status(201).send();
  }
}

export { CreateChartController };
