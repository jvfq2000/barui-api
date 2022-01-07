import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { ISaveUserDTO } from "@modules/account/dtos/ISaveUserDTO";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { IInstitutionsRepository } from "@modules/activityRegulation/repositories/IInstitutionsRepository";
import { AppError } from "@shared/errors/AppError";
import { accessLevel as accessLevelPermissions } from "@utils/permissions";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("InstitutionsRepository")
    private institutionsRepository: IInstitutionsRepository,
  ) {}

  async execute(
    adminId: string,
    {
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
  ): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("Já existe um usuário com esse e-mail.");
    }

    let newInstitutionId = institutionId;

    const adminUser = await this.usersRepository.findById(adminId);

    if (adminUser.accessLevel === accessLevelPermissions[3]) {
      newInstitutionId = adminUser.institutionId;
    } else if (!institutionId) {
      throw new AppError("Campus não informado.");
    }

    const institution = await this.institutionsRepository.findById(
      newInstitutionId,
    );

    if (!institution) {
      throw new AppError("Campus não encontrado.");
    }

    const passwordHash = await hash(identifier, 8);

    await this.usersRepository.save({
      name,
      lastName,
      email,
      identifier,
      telephone,
      initialSemester,
      registration,
      accessLevel,
      courseId,
      institutionId: newInstitutionId,
      password: passwordHash,
    });
  }
}

export { CreateUserUseCase };
