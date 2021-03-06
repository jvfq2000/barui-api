import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateProfileUserUseCase } from "./UpdateProfileUserUseCase";

class UpdateProfileUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
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

    const updateProfileUserUseCase = container.resolve(
      UpdateProfileUserUseCase,
    );

    const user = await updateProfileUserUseCase.execute({
      id,
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

    return response.json(user);
  }
}

export { UpdateProfileUserController };
