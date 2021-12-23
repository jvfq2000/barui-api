import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { accessLevel } from "@utils/permitions";

interface IRequest {
  userId: string;
  newAccessLevel: string;
}

@injectable()
class UpdateUserAccessLevelUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ userId, newAccessLevel }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError("Usuário não encontrado.");
    }

    if (!accessLevel[newAccessLevel]) {
      throw new AppError(`O nível de accesso ${newAccessLevel} não existe.`);
    }

    user.accessLevel = newAccessLevel;
    await this.usersRepository.create(user);
  }
}

export { UpdateUserAccessLevelUseCase };
