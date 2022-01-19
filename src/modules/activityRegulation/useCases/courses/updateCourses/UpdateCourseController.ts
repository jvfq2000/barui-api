import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateCourseUseCase } from "./UpdateCourseUseCase";

class UpdateCourseController {
  async handle(request: Request, response: Response): Promise<Response> {
    const adminId = request.user.id;
    const { courseId } = request.query;
    const { name, numberPeriods } = request.body;

    const updateCourseUseCase = container.resolve(UpdateCourseUseCase);

    const course = await updateCourseUseCase.execute(adminId, {
      id: String(courseId),
      name,
      numberPeriods,
    });

    return response.json(course);
  }
}

export { UpdateCourseController };
