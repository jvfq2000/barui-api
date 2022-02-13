import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindActivitiesByChartIdAndCategoryIdUseCase } from "./FindActivitiesByChartIdAndCategoryIdUseCase";

class FindActivitiesByChartIdAndCategoryIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { chartId, categoryId } = request.query;

    const findActivitiesByChartIdAndCategoryIdUseCase = container.resolve(
      FindActivitiesByChartIdAndCategoryIdUseCase,
    );

    const activities =
      await findActivitiesByChartIdAndCategoryIdUseCase.execute(
        String(chartId),
        String(categoryId),
      );

    return response.status(200).json(activities);
  }
}

export { FindActivitiesByChartIdAndCategoryIdController };
