import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ModifyIsActiveUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute(userId: string): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError("Usuário não encontrado.");
    }

    user.isActive = !user.isActive;

    await this.usersRepository.create(user);
  }
}

export { ModifyIsActiveUserUseCase };
