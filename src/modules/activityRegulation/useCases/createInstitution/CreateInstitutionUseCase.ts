import { ISaveInstitutionDTO } from "@modules/activityRegulation/dtos/ISaveInstitutionDTO";

class CreateInstitutionUseCase {
  constructor() {}
  async execute({ name, cityId }: ISaveInstitutionDTO): Promise<void> {}
}

export { CreateInstitutionUseCase };
