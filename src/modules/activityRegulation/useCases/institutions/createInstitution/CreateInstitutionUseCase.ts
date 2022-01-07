import { inject, injectable } from "tsyringe";

import { ISaveInstitutionDTO } from "@modules/activityRegulation/dtos/institution/ISaveInstitutionDTO";
import { IInstitutionsRepository } from "@modules/activityRegulation/repositories/IInstitutionsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateInstitutionUseCase {
  constructor(
    @inject("InstitutionsRepository")
    private institutionsRepository: IInstitutionsRepository,
  ) {}
  async execute({ name, cityId }: ISaveInstitutionDTO): Promise<void> {
    const institutionAlreadyExists =
      await this.institutionsRepository.findByName(name);

    if (institutionAlreadyExists) {
      throw new AppError("Já existe um campus com esse nome.");
    }

    await this.institutionsRepository.save({
      name,
      cityId,
    });
  }
}

export { CreateInstitutionUseCase };
