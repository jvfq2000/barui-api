import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { UserMap } from "@modules/accounts/mapper/UserMap";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
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
  }: ICreateUserDTO): Promise<IUserResponseDTO> {
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
