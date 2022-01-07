import { inject, injectable } from "tsyringe";

import { IInstitutionResponseDTO } from "@modules/activityRegulation/dtos/institution/IInstitutionResponseDTO";
import { InstitutionMap } from "@modules/activityRegulation/mapper/institutionMap";
import { IInstitutionsRepository } from "@modules/activityRegulation/repositories/IInstitutionsRepository";
import { ICitiesRepository } from "@modules/territory/repositories/ICitiesRepository";
import { IStatesRepository } from "@modules/territory/repositories/IStatesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class FindInstitutionByIdUseCase {
  constructor(
    @inject("InstitutionsRepository")
    private InstitutionsRepository: IInstitutionsRepository,
    @inject("StatesRepository")
    private statesRepository: IStatesRepository,
    @inject("CitiesRepository")
    private citiesRepository: ICitiesRepository,
  ) {}

  async execute(institutionId: string): Promise<IInstitutionResponseDTO> {
    const institution = await this.InstitutionsRepository.findById(
      institutionId,
    );

    if (!institution) {
      throw new AppError("Campus não encontrado.");
    }

    institution.city = await this.citiesRepository.findById(institution.cityId);

    institution.city.state = await this.statesRepository.findById(
      institution.city.stateId,
    );

    return InstitutionMap.toDTO(institution);
  }
}

export { FindInstitutionByIdUseCase };
