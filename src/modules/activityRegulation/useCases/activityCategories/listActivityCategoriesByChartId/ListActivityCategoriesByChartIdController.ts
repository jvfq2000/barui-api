import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListActivityCategoriesByChartIdUseCase } from "./ListActivityCategoriesByChartIdUseCase";

class ListActivityCategoriesByChartIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { chartId } = request.query;

    const listActivityCategoriesByChartIdUseCase = container.resolve(
      ListActivityCategoriesByChartIdUseCase,
    );

    const categories = await listActivityCategoriesByChartIdUseCase.execute(
      String(chartId),
    );

    return response.status(200).json(categories);
  }
}

export { ListActivityCategoriesByChartIdController };
