import { inject, injectable } from "tsyringe";

import { IListInstitutionsDTO } from "@modules/activityRegulation/dtos/IListInstitutionsDTO";
import { IInstitutionsRepository } from "@modules/activityRegulation/repositories/IInstitutionsRepository";

interface IRequest {
  page: number;
  registersPerPage: number;
  filter: string;
}

@injectable()
class ListInstitutionsUseCase {
  constructor(
    @inject("InstitutionsRepository")
    private institutionsRepository: IInstitutionsRepository,
  ) {}

  async execute({
    page,
    registersPerPage,
    filter,
  }: IRequest): Promise<IListInstitutionsDTO> {
    const { institutions, totalCount } = await this.institutionsRepository.list(
      page || 1,
      registersPerPage || 10,
      filter || "",
    );

    return { institutions, totalCount };
  }
}

export { ListInstitutionsUseCase };
