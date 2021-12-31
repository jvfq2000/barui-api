import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.query;
    const { name, lastName, email, identifier, accessLevel } = request.body;

    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    const user = await updateUserUseCase.execute({
      id: String(userId),
      name,
      lastName,
      email,
      identifier,
      accessLevel,
    });

    return response.json(user);
  }
}

export { UpdateUserController };
