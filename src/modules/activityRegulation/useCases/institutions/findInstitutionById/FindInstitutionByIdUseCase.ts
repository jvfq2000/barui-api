import { inject, injectable } from "tsyringe";

import { Institution } from "@modules/activityRegulation/infra/typeorm/entities/Institution";
import { IInstitutionsRepository } from "@modules/activityRegulation/repositories/IInstitutionsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class FindInstitutionByIdUseCase {
  constructor(
    @inject("InstitutionsRepository")
    private InstitutionsRepository: IInstitutionsRepository,
  ) {}

  async execute(institutionId: string): Promise<Institution> {
    const institution = await this.InstitutionsRepository.findById(
      institutionId,
    );

    if (!institution) {
      throw new AppError("Campus não encontrado.");
    }

    return institution;
  }
}

export { FindInstitutionByIdUseCase };
