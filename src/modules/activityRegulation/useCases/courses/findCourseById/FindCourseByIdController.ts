import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindCourseByIdUseCase } from "./FindCourseByIdUseCase";

class FindCourseByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const adminId = request.user.id;
    const { courseId } = request.query;

    const findCourseByIdUseCase = container.resolve(FindCourseByIdUseCase);

    console.log(adminId, courseId);

    const course = await findCourseByIdUseCase.execute(
      adminId,
      String(courseId),
    );

    return response.json(course);
  }
}

export { FindCourseByIdController };
