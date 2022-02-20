import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindStudentActivityByIdUseCase } from "./FindStudentActivityByIdUseCase";

class FindStudentActivityByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const currentUserId = request.user.id;
    const { studentActivityId, userId } = request.query;

    const findStudentActivityByIdUseCase = container.resolve(
      FindStudentActivityByIdUseCase,
    );

    const studentActivity = await findStudentActivityByIdUseCase.execute({
      currentUserId: String(currentUserId),
      userId: userId ? String(userId) : null,
      studentActivityId: studentActivityId ? String(studentActivityId) : null,
    });

    return response.json(studentActivity);
  }
}

export { FindStudentActivityByIdController };
