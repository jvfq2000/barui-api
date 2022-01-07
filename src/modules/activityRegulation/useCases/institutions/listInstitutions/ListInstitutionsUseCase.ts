import { inject, injectable } from "tsyringe";

import { IInstitutionResponseDTO } from "@modules/activityRegulation/dtos/institution/IInstitutionResponseDTO";
import { InstitutionMap } from "@modules/activityRegulation/mapper/institutionMap";
import { IInstitutionsRepository } from "@modules/activityRegulation/repositories/IInstitutionsRepository";
import { IStatesRepository } from "@modules/territory/repositories/IStatesRepository";

interface IResponse {
  institutions: IInstitutionResponseDTO[];
  totalCount: number;
}

interface IRequest {
  page: number;
  registersPerPage: number;
  filter: string;
  isActive: boolean;
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
  }: IRequest): Promise<IResponse> {
    const { institutions, totalCount } = await this.institutionsRepository.list(
      page || 1,
      registersPerPage || 10,
      filter || "",
    );

    const formattedInstitutions: IInstitutionResponseDTO[] = [];
    let totalCountIsActive = totalCount;

    const institutionsPromise = institutions.map(async institution => {
      if (institution.isActive === isActive) {
        const state = await this.statesRepository.findById(
          institution.city.stateId,
        );

        const institutionWithState = institution;
        institutionWithState.city.state = state;

        formattedInstitutions.push(InstitutionMap.toDTO(institutionWithState));
      } else {
        totalCountIsActive -= 1;
      }
    });

    await Promise.all(institutionsPromise);

    return {
      institutions: formattedInstitutions,
      totalCount: totalCountIsActive,
    };
  }
}

export { ListInstitutionsUseCase };
