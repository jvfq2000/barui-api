import { inject, injectable } from "tsyringe";

import { IUserResponseDTO } from "@modules/account/dtos/IUserResponseDTO";
import { UserMap } from "@modules/account/mapper/UserMap";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}
  async execute(userId: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(userId);
    return UserMap.toDTO(user);
  }
}

export { ProfileUserUseCase };
