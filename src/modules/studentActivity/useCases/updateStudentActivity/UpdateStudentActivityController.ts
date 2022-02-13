import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateStudentActivityUseCase } from "./UpdateStudentActivityUseCase";

class UpdateStudentActivityController {
  async handle(request: Request, response: Response): Promise<Response> {
    const currentUserId = request.user.id;
    const { userId, studentActivity } = request.body;

    const updateStudentActivityUseCase = container.resolve(
      UpdateStudentActivityUseCase,
    );

    await updateStudentActivityUseCase.execute({
      currentUserId: String(currentUserId),
      userId,
      studentActivityRequest: studentActivity,
    });

    return response.status(204).send();
  }
}

export { UpdateStudentActivityController };
