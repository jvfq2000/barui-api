/* eslint-disable no-unused-expressions */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListUsersUseCase } from "./ListUsersUseCase";

class ListUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page, registersPerPage, filter, isActive } = request.query;

    const listUsersUseCase = container.resolve(ListUsersUseCase);

    const users = await listUsersUseCase.execute({
      page: Number(page),
      registersPerPage: Number(registersPerPage),
      filter: filter as string,
      isActive: isActive !== "false",
    });

    return response.status(200).json(users);
  }
}

export { ListUsersController };
