import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindChartByIdUseCase } from "./FindChartByIdUseCase";

class FindChartByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { chartId } = request.query;

    const findChartByIdUseCase = container.resolve(FindChartByIdUseCase);

    const chart = await findChartByIdUseCase.execute(userId, String(chartId));

    return response.status(200).json(chart);
  }
}

export { FindChartByIdController };
