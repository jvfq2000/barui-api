import { inject, injectable } from "tsyringe";

import { IUserResponseDTO } from "@modules/account/dtos/IUserResponseDTO";
import { UserMap } from "@modules/account/mapper/UserMap";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class FindUserByIdUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError("Usuário não encontrado.");
    }

    return UserMap.toDTO(user);
  }
}

export { FindUserByIdUseCase };
