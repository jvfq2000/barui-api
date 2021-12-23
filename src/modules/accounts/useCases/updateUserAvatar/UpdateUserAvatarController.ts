import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const avatarFile = request.file.filename;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    const avatarUrl = await updateUserAvatarUseCase.execute({
      userId: id,
      avatarFile,
    });

    return response.json({ avatarUrl });
  }
}

export { UpdateUserAvatarController };
