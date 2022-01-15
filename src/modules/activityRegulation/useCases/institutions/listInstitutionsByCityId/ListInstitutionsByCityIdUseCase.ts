import { inject, injectable } from "tsyringe";

import { IInstitutionResponseDTO } from "@modules/activityRegulation/dtos/institution/IInstitutionResponseDTO";
import { InstitutionMap } from "@modules/activityRegulation/mapper/InstitutionMap";
import { IInstitutionsRepository } from "@modules/activityRegulation/repositories/IInstitutionsRepository";
import { ICitiesRepository } from "@modules/territory/repositories/ICitiesRepository";
import { IStatesRepository } from "@modules/territory/repositories/IStatesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ListInstitutionsByCityIdUseCase {
  constructor(
    @inject("InstitutionsRepository")
    private institutionsRepository: IInstitutionsRepository,
    @inject("StatesRepository")
    private statesRepository: IStatesRepository,
    @inject("CitiesRepository")
    private citiesRepository: ICitiesRepository,
  ) {}

  async execute(cityId: string): Promise<IInstitutionResponseDTO[]> {
    const city = await this.citiesRepository.findById(cityId);

    if (!city) {
      throw new AppError("Cidade não encontrada.");
    }

    const institutions = await this.institutionsRepository.listByCityId(cityId);

    const formattedInstitutions: IInstitutionResponseDTO[] = [];

    const institutionsPromise = institutions.map(async institution => {
      const state = await this.statesRepository.findById(city.stateId);

      const institutionWithState = institution;

      institutionWithState.city = city;
      institutionWithState.city.state = state;

      formattedInstitutions.push(InstitutionMap.toDTO(institutionWithState));
    });

    await Promise.all(institutionsPromise);

    return formattedInstitutions;
  }
}

export { ListInstitutionsByCityIdUseCase };
