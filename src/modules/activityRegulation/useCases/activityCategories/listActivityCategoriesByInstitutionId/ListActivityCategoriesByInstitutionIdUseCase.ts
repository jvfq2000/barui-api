import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { IActivityCategoryResponseDTO } from "@modules/activityRegulation/dtos/activityCategory/IActivityCategoryResponseDTO";
import { ActivityCategoryMap } from "@modules/activityRegulation/mapper/ActivityCategoryMap";
import { IActivityCategoriesRepository } from "@modules/activityRegulation/repositories/IActivityCategoriesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ListActivityCategoriesByInstitutionIdUseCase {
  constructor(
    @inject("ActivityCategoriesRepository")
    private activityCategoriesRepository: IActivityCategoriesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute(adminId: string): Promise<IActivityCategoryResponseDTO[]> {
    const adminUser = await this.usersRepository.findById(adminId);

    if (!adminUser.institutionId) {
      throw new AppError("É necessário que você esteja vinculado a um campus.");
    }

    const activityCategories =
      await this.activityCategoriesRepository.listByInstitutionId(
        adminUser.institutionId,
      );

    const formattedActivityCategories: IActivityCategoryResponseDTO[] = [];

    activityCategories.forEach(activityCategory => {
      formattedActivityCategories.push(
        ActivityCategoryMap.toDTO(activityCategory),
      );
    });

    return formattedActivityCategories;
  }
}

export { ListActivityCategoriesByInstitutionIdUseCase };
