import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserAccessLevelUseCase } from "./UpdateUserAccessLevelUseCase";

class UpdateUserAccessLevelController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.query;
    const { accessLevel } = request.body;

    const updateUserAccessLevelUseCase = container.resolve(
      UpdateUserAccessLevelUseCase,
    );

    await updateUserAccessLevelUseCase.execute({
      userId: String(userId),
      newAccessLevel: accessLevel,
    });

    return response.status(204).send();
  }
}

export { UpdateUserAccessLevelController };
