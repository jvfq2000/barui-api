import { inject, injectable } from "tsyringe";

import { ISaveInstitutionDTO } from "@modules/activityRegulation/dtos/ISaveInstitutionDTO";
import { Institution } from "@modules/activityRegulation/infra/typeorm/entities/Institution";
import { IInstitutionsRepository } from "@modules/activityRegulation/repositories/IInstitutionsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class UpdateInstitutionUseCase {
  constructor(
    @inject("InstitutionsRepository")
    private institutionsRepository: IInstitutionsRepository,
  ) {}

  async execute({
    id,
    name,
    cityId,
  }: ISaveInstitutionDTO): Promise<Institution> {
    let institution = await this.institutionsRepository.findById(id);

    if (!institution) {
      throw new AppError("Campus não encontrado.");
    }

    Object.assign(institution, {
      name,
      cityId,
    });

    await this.institutionsRepository.save(institution);

    institution = await this.institutionsRepository.findById(id);
    return institution;
  }
}

export { UpdateInstitutionUseCase };
