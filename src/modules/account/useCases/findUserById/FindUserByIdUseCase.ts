import { inject, injectable } from "tsyringe";

import { IUserResponseDTO } from "@modules/account/dtos/IUserResponseDTO";
import { UserMap } from "@modules/account/mapper/UserMap";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { accessLevel as accessLevelPermitions } from "@utils/permitions";

@injectable()
class FindUserByIdUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute(adminId: string, userId: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError("Usuário não encontrado.");
    }

    const adminUser = await this.usersRepository.findById(adminId);

    if (
      accessLevelPermitions[adminUser.accessLevel] <=
        accessLevelPermitions["administrador do campus"] &&
      adminUser.institutionId !== user.institutionId
    ) {
      throw new AppError(
        "Você não tem permissão para realizar esta ação!",
        401,
      );
    }

    if (
      accessLevelPermitions[adminUser.accessLevel] <
        accessLevelPermitions["administrador do campus"] &&
      adminUser.courseId !== user.courseId
    ) {
      throw new AppError(
        "Você não tem permissão para realizar esta ação!",
        401,
      );
    }

    return UserMap.toDTO(user);
  }
}

export { FindUserByIdUseCase };
