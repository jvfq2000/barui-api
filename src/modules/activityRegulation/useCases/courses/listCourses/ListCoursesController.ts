/* eslint-disable no-unused-expressions */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCoursesUseCase } from "./ListCoursesUseCase";

class ListCoursesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { page, registersPerPage, filter, isActive } = request.query;

    const listCoursesUseCase = container.resolve(ListCoursesUseCase);

    const courses = await listCoursesUseCase.execute({
      userId,
      page: Number(page),
      registersPerPage: Number(registersPerPage),
      filter: filter as string,
      isActive: isActive !== "false",
    });

    return response.status(200).json(courses);
  }
}

export { ListCoursesController };
