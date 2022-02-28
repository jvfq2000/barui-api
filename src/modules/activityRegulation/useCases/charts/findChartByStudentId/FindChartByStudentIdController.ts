import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindChartByStudentIdUseCase } from "./FindChartByStudentIdUseCase";

class FindChartByStudentIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { studentId } = request.query;

    const findChartByStudentIdUseCase = container.resolve(
      FindChartByStudentIdUseCase,
    );

    const chart = await findChartByStudentIdUseCase.execute(
      studentId ? String(studentId) : userId,
    );

    return response.status(200).json(chart);
  }
}

export { FindChartByStudentIdController };
