import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateChartUseCase } from "./UpdateChartUseCase";

class UpdateChartController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { id, name, inForceFrom, courseId, activities } = request.body;

    const updateChartUseCase = container.resolve(UpdateChartUseCase);

    await updateChartUseCase.execute(userId, {
      id,
      name,
      inForceFrom,
      courseId,
      activities,
    });

    return response.status(201).send();
  }
}

export { UpdateChartController };
