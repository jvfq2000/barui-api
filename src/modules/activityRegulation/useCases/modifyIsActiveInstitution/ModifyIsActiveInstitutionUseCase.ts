import { inject, injectable } from "tsyringe";

import { IInstitutionsRepository } from "@modules/activityRegulation/repositories/IInstitutionsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ModifyIsActiveInstitutionUseCase {
  constructor(
    @inject("InstitutionsRepository")
    private institutionsRepository: IInstitutionsRepository,
  ) {}

  async execute(institutionId: string): Promise<void> {
    const institution = await this.institutionsRepository.findById(
      institutionId,
    );

    if (!institution) {
      throw new AppError("Campus não encontrado.");
    }

    institution.isActive = !institution.isActive;

    await this.institutionsRepository.save(institution);
  }
}

export { ModifyIsActiveInstitutionUseCase };
