import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateRegulationUseCase } from "./CreateRegulationUseCase";

class CreateRegulationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const file = request.file.filename;
    const { name, inForceFrom, courseId } = request.body;

    const createRegulationUseCase = container.resolve(CreateRegulationUseCase);

    await createRegulationUseCase.execute(userId, {
      name,
      inForceFrom,
      file,
      courseId,
    });

    return response.status(201).send();
  }
}

export { CreateRegulationController };
