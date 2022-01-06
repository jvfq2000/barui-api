import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCourseUseCase } from "./CreateCourseUseCase";

class CreateCourseController {
  async handle(request: Request, response: Response): Promise<Response> {
    const adminId = request.user.id;
    const { name, numberPeriods, institutionId } = request.body;

    const createCourseUseCase = container.resolve(CreateCourseUseCase);

    await createCourseUseCase.execute(adminId, {
      name,
      numberPeriods,
      institutionId,
    });

    return response.status(201).send();
  }
}

export { CreateCourseController };
