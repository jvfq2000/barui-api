import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCoursesByInstitutionIdUseCase } from "./ListCoursesByInstitutionIdUseCase";

class ListCoursesByInstitutionIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const adminId = request.user.id;

    const listCoursesByInstitutionIdUseCase = container.resolve(
      ListCoursesByInstitutionIdUseCase,
    );

    const courses = await listCoursesByInstitutionIdUseCase.execute(adminId);

    return response.status(200).json(courses);
  }
}

export { ListCoursesByInstitutionIdController };
