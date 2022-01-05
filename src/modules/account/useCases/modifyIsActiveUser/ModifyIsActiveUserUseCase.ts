import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { accessLevel as accessLevelPermitions } from "@utils/permitions";

@injectable()
class ModifyIsActiveUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute(adminId, userId: string): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError("Usuário não encontrado.");
    }

    const adminUser = await this.usersRepository.findById(adminId);

    if (
      adminUser.accessLevel === accessLevelPermitions[3] &&
      adminUser.institutionId !== user.institutionId
    ) {
      throw new AppError(
        "Você não tem permissão para realizar esta ação!",
        401,
      );
    }

    user.isActive = !user.isActive;

    await this.usersRepository.save(user);
  }
}

export { ModifyIsActiveUserUseCase };
