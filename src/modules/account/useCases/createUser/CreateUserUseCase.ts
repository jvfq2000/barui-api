import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { ISaveUserDTO } from "@modules/account/dtos/ISaveUserDTO";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    name,
    lastName,
    email,
    identifier,
    accessLevel,
    password,
  }: ISaveUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("Já existe um usuário com esse e-mail!");
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      name,
      lastName,
      email,
      identifier,
      accessLevel,
      password: passwordHash,
    });
  }
}

export { CreateUserUseCase };
