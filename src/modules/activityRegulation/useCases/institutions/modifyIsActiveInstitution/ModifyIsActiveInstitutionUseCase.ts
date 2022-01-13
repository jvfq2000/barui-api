import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/account/repositories/IUsersTokensRepository";
import { IInstitutionsRepository } from "@modules/activityRegulation/repositories/IInstitutionsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ModifyIsActiveInstitutionUseCase {
  constructor(
    @inject("InstitutionsRepository")
    private institutionsRepository: IInstitutionsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
  ) {}

  async execute(institutionId: string): Promise<void> {
    const institution = await this.institutionsRepository.findById(
      institutionId,
    );

    if (!institution) {
      throw new AppError("Campus não encontrado.");
    }

    if (institution.isActive) {
      const users = await this.usersRepository.listByInstitutionId(
        institution.id,
      );

      const usersTokensPromise = users.map(async user => {
        await this.usersTokensRepository.deleteByUserId(user.id);
      });

      await Promise.all(usersTokensPromise);
    }

    institution.isActive = !institution.isActive;

    await this.institutionsRepository.save(institution);
  }
}

export { ModifyIsActiveInstitutionUseCase };
