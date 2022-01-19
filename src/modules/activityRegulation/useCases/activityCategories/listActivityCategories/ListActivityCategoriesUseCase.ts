import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { IActivityCategoryResponseDTO } from "@modules/activityRegulation/dtos/activityCategory/IActivityCategoryResponseDTO";
import { ActivityCategoryMap } from "@modules/activityRegulation/mapper/ActivityCategoryMap";
import { IActivityCategoriesRepository } from "@modules/activityRegulation/repositories/IActivityCategoriesRepository";
import { IGeneralListDTO } from "@utils/IGeneralListDTO";
import { accessLevel } from "@utils/permissions";

interface IResponse {
  activityCategories: IActivityCategoryResponseDTO[];
  totalCount: number;
}

@injectable()
class ListActivityCategoriesUseCase {
  constructor(
    @inject("ActivityCategoriesRepository")
    private activityCategoriesRepository: IActivityCategoriesRepository,
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
    const adminUser = await this.usersRepository.findById(userId);

    const institutionId =
      adminUser.accessLevel === accessLevel[3] ? adminUser.institutionId : "";

    const { activityCategories, totalCount } =
      await this.activityCategoriesRepository.list({
        institutionId,
        page: page || 1,
        registersPerPage: registersPerPage || 10,
        filter: filter || "",
        isActive,
      });

    const formattedActivityCategories: IActivityCategoryResponseDTO[] = [];

    activityCategories.forEach(activityCategory => {
      formattedActivityCategories.push(
        ActivityCategoryMap.toDTO(activityCategory),
      );
    });

    return { activityCategories: formattedActivityCategories, totalCount };
  }
}

export { ListActivityCategoriesUseCase };
