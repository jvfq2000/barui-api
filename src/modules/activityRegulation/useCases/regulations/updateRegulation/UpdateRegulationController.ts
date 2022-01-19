import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateRegulationUseCase } from "./UpdateRegulationUseCase";

class UpdateRegulationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const file = request.file?.filename;

    const { name, inForceFrom, courseId } = request.body;
    const { regulationId } = request.query;

    const updateRegulationUseCase = container.resolve(UpdateRegulationUseCase);

    await updateRegulationUseCase.execute(userId, {
      id: String(regulationId),
      name,
      inForceFrom,
      file,
      courseId,
    });

    return response.status(201).send();
  }
}

export { UpdateRegulationController };
