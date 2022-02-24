import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateStudentActivityUseCase } from "./CreateStudentActivityUseCase";

class CreateStudentActivityController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const {
      description,
      hours,
      semester,
      isCertified,
      justification,
      activityId,
    } = request.body;

    const file = isCertified === "true" ? request.file.filename : "";

    const createStudentActivityUseCase = container.resolve(
      CreateStudentActivityUseCase,
    );

    await createStudentActivityUseCase.execute({
      description,
      hours,
      semester,
      isCertified: isCertified === "true",
      file,
      justification,
      activityId,
      userId,
    });

    return response.status(201).send();
  }
}

export { CreateStudentActivityController };
