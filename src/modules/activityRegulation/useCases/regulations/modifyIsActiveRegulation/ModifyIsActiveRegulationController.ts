import { Request, Response } from "express";
import { container } from "tsyringe";

import { ModifyIsActiveRegulationUseCase } from "./ModifyIsActiveRegulationUseCase";

class ModifyIsActiveRegulationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const adminId = request.user.id;
    const { regulationId } = request.query;

    const modifyIsActiveRegulationUseCase = container.resolve(
      ModifyIsActiveRegulationUseCase,
    );

    await modifyIsActiveRegulationUseCase.execute(
      String(adminId),
      String(regulationId),
    );

    return response.status(204).send();
  }
}

export { ModifyIsActiveRegulationController };
