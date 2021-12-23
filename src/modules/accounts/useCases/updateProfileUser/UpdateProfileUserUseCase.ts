import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { UserMap } from "@modules/accounts/mapper/UserMap";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

@injectable()
class UpdateProfileUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    id,
    name,
    lastName,
    email,
  }: ICreateUserDTO): Promise<IUserResponseDTO> {
    let user = await this.usersRepository.findById(id);

    Object.assign(user, { name, lastName, email });

    await this.usersRepository.create(user);

    user = await this.usersRepository.findById(id);
    return UserMap.toDTO(user);
  }
}

export { UpdateProfileUserUseCase };
