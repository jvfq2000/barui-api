import { Request, Response } from "express";
import { container } from "tsyringe";

import { ModifyIsActiveChartUseCase } from "./ModifyIsActiveChartUseCase";

class ModifyIsActiveChartController {
  async handle(request: Request, response: Response): Promise<Response> {
    const adminId = request.user.id;
    const { chartId } = request.query;

    const modifyIsActiveChartUseCase = container.resolve(
      ModifyIsActiveChartUseCase,
    );

    await modifyIsActiveChartUseCase.execute(adminId, String(chartId));

    return response.status(204).send();
  }
}

export { ModifyIsActiveChartController };
