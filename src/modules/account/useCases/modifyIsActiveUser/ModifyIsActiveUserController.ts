import { Request, Response } from "express";
import { container } from "tsyringe";

import { ModifyIsActiveUserUseCase } from "./ModifyIsActiveUserUseCase";

class ModifyIsActiveUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.query;

    const modifyIsActiveUserUseCase = container.resolve(
      ModifyIsActiveUserUseCase,
    );

    await modifyIsActiveUserUseCase.execute(String(userId));

    return response.status(204).send();
  }
}

export { ModifyIsActiveUserController };
