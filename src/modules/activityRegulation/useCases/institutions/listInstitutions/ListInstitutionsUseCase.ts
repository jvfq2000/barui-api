import { inject, injectable } from "tsyringe";

import { IInstitutionResponseDTO } from "@modules/activityRegulation/dtos/institution/IInstitutionResponseDTO";
import { InstitutionMap } from "@modules/activityRegulation/mapper/institutionMap";
import { IInstitutionsRepository } from "@modules/activityRegulation/repositories/IInstitutionsRepository";
import { IStatesRepository } from "@modules/territory/repositories/IStatesRepository";
import { IGeneralListDTO } from "@utils/IGeneralListDTO";

interface IResponse {
  institutions: IInstitutionResponseDTO[];
  totalCount: number;
}

@injectable()
class ListInstitutionsUseCase {
  constructor(
    @inject("InstitutionsRepository")
    private institutionsRepository: IInstitutionsRepository,
    @inject("StatesRepository")
    private statesRepository: IStatesRepository,
  ) {}

  async execute({
    page,
    registersPerPage,
    filter,
    isActive,
  }: IGeneralListDTO): Promise<IResponse> {
    const { institutions, totalCount } = await this.institutionsRepository.list(
      {
        page: page || 1,
        registersPerPage: registersPerPage || 10,
        filter: filter || "",
        isActive,
      },
    );

    const formattedInstitutions: IInstitutionResponseDTO[] = [];
    const totalCountIsActive = totalCount;

    const institutionsPromise = institutions.map(async institution => {
      const institutionWithState = institution;

      institutionWithState.city.state = await this.statesRepository.findById(
        institution.city.stateId,
      );

      formattedInstitutions.push(InstitutionMap.toDTO(institutionWithState));
    });

    await Promise.all(institutionsPromise);

    return {
      institutions: formattedInstitutions,
      totalCount: totalCountIsActive,
    };
  }
}

export { ListInstitutionsUseCase };
