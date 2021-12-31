import { inject, injectable } from "tsyringe";

import { ISaveUserDTO } from "@modules/account/dtos/ISaveUserDTO";
import { IUserResponseDTO } from "@modules/account/dtos/IUserResponseDTO";
import { UserMap } from "@modules/account/mapper/UserMap";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    id,
    name,
    lastName,
    email,
    identifier,
    accessLevel,
  }: ISaveUserDTO): Promise<IUserResponseDTO> {
    let user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError("Usuário não encontrado.");
    }

    Object.assign(user, { name, lastName, email, identifier, accessLevel });

    await this.usersRepository.create(user);

    user = await this.usersRepository.findById(id);
    return UserMap.toDTO(user);
  }
}

export { UpdateUserUseCase };
