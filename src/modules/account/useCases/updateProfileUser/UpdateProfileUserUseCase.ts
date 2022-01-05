import { inject, injectable } from "tsyringe";

import { ISaveUserDTO } from "@modules/account/dtos/ISaveUserDTO";
import { IUserResponseDTO } from "@modules/account/dtos/IUserResponseDTO";
import { UserMap } from "@modules/account/mapper/UserMap";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";

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
  }: ISaveUserDTO): Promise<IUserResponseDTO> {
    let user = await this.usersRepository.findById(id);

    Object.assign(user, { name, lastName, email });

    await this.usersRepository.save(user);

    user = await this.usersRepository.findById(id);
    return UserMap.toDTO(user);
  }
}

export { UpdateProfileUserUseCase };
