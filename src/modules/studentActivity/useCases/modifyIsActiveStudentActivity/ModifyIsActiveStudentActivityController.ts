import { Request, Response } from "express";
import { container } from "tsyringe";

import { ModifyIsActiveStudentActivityUseCase } from "./ModifyIsActiveStudentActivityUseCase";

class ModifyIsActiveStudentActivityController {
  async handle(request: Request, response: Response): Promise<Response> {
    const currentUserId = request.user.id;
    const { userId, studentActivityId } = request.query;

    const modifyIsActiveStudentActivityUseCase = container.resolve(
      ModifyIsActiveStudentActivityUseCase,
    );

    await modifyIsActiveStudentActivityUseCase.execute({
      currentUserId: String(currentUserId),
      userId: userId ? String(userId) : null,
      studentActivityId: studentActivityId ? String(studentActivityId) : null,
    });

    return response.status(204).send();
  }
}

export { ModifyIsActiveStudentActivityController };
