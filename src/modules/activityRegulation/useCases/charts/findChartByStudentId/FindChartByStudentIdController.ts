import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindChartByStudentIdUseCase } from "./FindChartByStudentIdUseCase";

class FindChartByStudentIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const findChartByStudentIdUseCase = container.resolve(
      FindChartByStudentIdUseCase,
    );

    await findChartByStudentIdUseCase.execute(userId);

    return response.status(201).send();
  }
}

export { FindChartByStudentIdController };
