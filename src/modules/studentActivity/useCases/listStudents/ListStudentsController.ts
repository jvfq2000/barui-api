/* eslint-disable no-unused-expressions */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListStudentsUseCase } from "./ListStudentsUseCase";

class ListStudentsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const currentUser = request.user.id;

    const listStudentsUseCase = container.resolve(ListStudentsUseCase);

    const students = await listStudentsUseCase.execute(currentUser);

    return response.status(200).json(students);
  }
}

export { ListStudentsController };
