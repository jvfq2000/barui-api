import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindUserByIdUseCase } from "./FindUserByIdUseCase";

class FindUserByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const adminId = request.user.id;
    const { userId } = request.query;

    const findUserByIdUseCase = container.resolve(FindUserByIdUseCase);

    const user = await findUserByIdUseCase.execute(adminId, String(userId));

    return response.json(user);
  }
}

export { FindUserByIdController };
