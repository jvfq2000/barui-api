/* eslint-disable no-unused-expressions */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListStudentActivitiesUseCase } from "./ListStudentActivitiesUseCase";

class ListStudentActivitiesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const currentUser = request.user.id;
    const { page, registersPerPage, filter, isActive, userId } = request.query;

    const listStudentActivitiesUseCase = container.resolve(
      ListStudentActivitiesUseCase,
    );

    const studentActivities = await listStudentActivitiesUseCase.execute(
      currentUser,
      {
        userId: String(userId),
        page: Number(page),
        registersPerPage: Number(registersPerPage),
        filter: filter as string,
        isActive: isActive !== "false",
      },
    );

    return response.status(200).json(studentActivities);
  }
}

export { ListStudentActivitiesController };
