import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListChartsUseCase } from "./ListChartsUseCase";

class ListChartsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { page, registersPerPage, filter, isActive } = request.query;

    const listChartsUseCase = container.resolve(ListChartsUseCase);

    const charts = await listChartsUseCase.execute({
      userId,
      page: Number(page),
      registersPerPage: Number(registersPerPage),
      filter: filter as string,
      isActive: isActive !== "false",
    });

    return response.status(200).json(charts);
  }
}

export { ListChartsController };
