import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListHistoricalByStudentActivityIdUseCase } from "./ListHistoricalByStudentActivityIdUseCase";

class ListHistoricalByStudentActivityIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { studentActivityId } = request.query;

    const listHistoricalByStudentActivityIdUseCase = container.resolve(
      ListHistoricalByStudentActivityIdUseCase,
    );

    const studentActivity =
      await listHistoricalByStudentActivityIdUseCase.execute(
        studentActivityId ? String(studentActivityId) : null,
      );

    return response.json(studentActivity);
  }
}

export { ListHistoricalByStudentActivityIdController };
