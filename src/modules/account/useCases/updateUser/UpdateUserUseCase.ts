import { inject, injectable } from "tsyringe";

import { ISaveUserDTO } from "@modules/account/dtos/ISaveUserDTO";
import { IUserResponseDTO } from "@modules/account/dtos/IUserResponseDTO";
import { UserMap } from "@modules/account/mapper/UserMap";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { accessLevel as accessLevelPermissions } from "@utils/permissions";

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute(
    adminId: string,
    {
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
    }: ISaveUserDTO,
  ): Promise<IUserResponseDTO> {
    let user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError("Usuário não encontrado.");
    }

    const adminUser = await this.usersRepository.findById(adminId);

    if (
      adminUser.accessLevel === accessLevelPermissions[3] &&
      adminUser.institutionId !== user.institutionId
    ) {
      throw new AppError(
        "Você não tem permissão para realizar esta ação!",
        401,
      );
    }

    Object.assign(user, {
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

    await this.usersRepository.save(user);

    user = await this.usersRepository.findById(id);
    return UserMap.toDTO(user);
  }
}

export { UpdateUserUseCase };
