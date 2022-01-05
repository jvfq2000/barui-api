/* eslint-disable no-unused-expressions */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCoursesUseCase } from "./ListCoursesUseCase";

class ListCoursesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const adminId = request.user.id;
    const { page, registersPerPage, filter } = request.query;

    const listCoursesUseCase = container.resolve(ListCoursesUseCase);

    const courses = await listCoursesUseCase.execute(adminId, {
      page: Number(page),
      registersPerPage: Number(registersPerPage),
      filter: filter as string,
    });

    return response.status(200).json(courses);
  }
}

export { ListCoursesController };
