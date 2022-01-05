import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.query;
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

    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    const user = await updateUserUseCase.execute(adminId, {
      id: String(userId),
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

export { UpdateUserController };
