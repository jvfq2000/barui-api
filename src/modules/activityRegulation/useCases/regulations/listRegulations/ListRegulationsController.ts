import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListRegulationsUseCase } from "./ListRegulationsUseCase";

class ListRegulationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { page, registersPerPage, filter, isActive } = request.query;

    const listRegulationsUseCase = container.resolve(ListRegulationsUseCase);
    const regulations = await listRegulationsUseCase.execute({
      userId,
      page: Number(page),
      registersPerPage: Number(registersPerPage),
      filter: filter as string,
      isActive: isActive !== "false",
    });

    return response.json(regulations);
  }
}

export { ListRegulationsController };
