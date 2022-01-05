import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      lastName,
      email,
      identifier,
      telephone,
      initialSemester,
      registration,
      accessLevel,
      courseId,
      institutionId,
    } = request.body;

    const adminId = request.user.id;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute(adminId, {
      name,
      lastName,
      email,
      identifier,
      telephone,
      initialSemester,
      registration,
      accessLevel,
      courseId,
      institutionId,
    });

    return response.status(201).send();
  }
}

export { CreateUserController };
