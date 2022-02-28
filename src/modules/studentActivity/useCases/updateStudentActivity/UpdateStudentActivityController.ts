import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateStudentActivityUseCase } from "./UpdateStudentActivityUseCase";

class UpdateStudentActivityController {
  async handle(request: Request, response: Response): Promise<Response> {
    const currentUserId = request.user.id;

    const {
      description,
      hours,
      semester,
      isCertified,
      justification,
      activityId,
      userId,
      approvedHours,
    } = request.body;

    const { studentActivityId } = request.query;
    const file = isCertified === "true" ? request.file?.filename : "";

    const updateStudentActivityUseCase = container.resolve(
      UpdateStudentActivityUseCase,
    );

    await updateStudentActivityUseCase.execute({
      currentUserId: String(currentUserId),
      studentActivityRequest: {
        id: String(studentActivityId),
        description,
        hours,
        semester,
        isCertified: isCertified === "true",
        file,
        justification,
        activityId,
        userId,
        approvedHours,
      },
    });

    return response.status(204).send();
  }
}

export { UpdateStudentActivityController };
