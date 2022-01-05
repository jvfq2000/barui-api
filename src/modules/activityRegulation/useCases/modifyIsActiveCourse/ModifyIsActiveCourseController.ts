import { Request, Response } from "express";
import { container } from "tsyringe";

import { ModifyIsActiveCourseUseCase } from "./ModifyIsActiveCourseUseCase";

class ModifyIsActiveCourseController {
  async handle(request: Request, response: Response): Promise<Response> {
    const adminId = request.user.id;
    const { courseId } = request.query;

    const modifyIsActiveCourseUseCase = container.resolve(
      ModifyIsActiveCourseUseCase,
    );

    await modifyIsActiveCourseUseCase.execute(adminId, String(courseId));

    return response.status(204).send();
  }
}

export { ModifyIsActiveCourseController };
