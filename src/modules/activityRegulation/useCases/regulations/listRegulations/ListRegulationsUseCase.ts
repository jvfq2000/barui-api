import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { IRegulationResponseDTO } from "@modules/activityRegulation/dtos/regulation/IRegulationResponseDTO";
import { RegulationMap } from "@modules/activityRegulation/mapper/regulationMap";
import { IRegulationsRepository } from "@modules/activityRegulation/repositories/IRegulationsRepository";
import { IGeneralListDTO } from "@utils/IGeneralListDTO";
import { accessLevel } from "@utils/permissions";

interface IResponse {
  regulations: IRegulationResponseDTO[];
  totalCount: number;
}

@injectable()
class ListRegulationsUseCase {
  constructor(
    @inject("RegulationsRepository")
    private regulationsRepository: IRegulationsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    userId,
    page,
    registersPerPage,
    filter,
    isActive,
  }: IGeneralListDTO): Promise<IResponse> {
    const user = await this.usersRepository.findById(userId);

    const courseId = user.accessLevel <= accessLevel[2] ? user.courseId : null;

    const institutionId =
      user.accessLevel === accessLevel[3] ? user.institutionId : null;

    const { regulations, totalCount } = await this.regulationsRepository.list({
      institutionId,
      courseId,
      page: page || 1,
      registersPerPage: registersPerPage || 10,
      filter: filter || "",
      isActive,
    });

    const regulationsFormatted: IRegulationResponseDTO[] = [];

    regulations.forEach(regulation => {
      regulationsFormatted.push(RegulationMap.toDTO(regulation));
    });

    return { regulations: regulationsFormatted, totalCount };
  }
}
export { ListRegulationsUseCase };
