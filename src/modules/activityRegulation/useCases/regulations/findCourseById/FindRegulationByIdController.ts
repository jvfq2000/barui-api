import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindRegulationByIdUseCase } from "./FindRegulationByIdUseCase";

class FindRegulationByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const adminId = request.user.id;
    const { regulationId } = request.query;

    const findRegulationByIdUseCase = container.resolve(
      FindRegulationByIdUseCase,
    );

    const regulation = await findRegulationByIdUseCase.execute(
      adminId,
      String(regulationId),
    );

    return response.json(regulation);
  }
}

export { FindRegulationByIdController };
