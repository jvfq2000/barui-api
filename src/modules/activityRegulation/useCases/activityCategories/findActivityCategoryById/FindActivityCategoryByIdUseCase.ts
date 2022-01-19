import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { IActivityCategoryResponseDTO } from "@modules/activityRegulation/dtos/activityCategory/IActivityCategoryResponseDTO";
import { ActivityCategoryMap } from "@modules/activityRegulation/mapper/ActivityCategoryMap";
import { IActivityCategoriesRepository } from "@modules/activityRegulation/repositories/IActivityCategoriesRepository";
import { IInstitutionsRepository } from "@modules/activityRegulation/repositories/IInstitutionsRepository";
import { AppError } from "@shared/errors/AppError";
import { accessLevel as accessLevelPermissions } from "@utils/permissions";

@injectable()
class FindActivityCategoryByIdUseCase {
  constructor(
    @inject("ActivityCategoriesRepository")
    private activityCategoriesRepository: IActivityCategoriesRepository,
    @inject("InstitutionsRepository")
    private institutionsRepository: IInstitutionsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute(
    adminId: string,
    activityCategoryId: string,
  ): Promise<IActivityCategoryResponseDTO> {
    const activityCategory = await this.activityCategoriesRepository.findById(
      activityCategoryId,
    );

    if (!activityCategory) {
      throw new AppError("Categoria não encontrada.");
    }

    const adminUser = await this.usersRepository.findById(adminId);

    if (
      adminUser.accessLevel === accessLevelPermissions[3] &&
      adminUser.institutionId !== activityCategory.institutionId
    ) {
      throw new AppError(
        "Você não tem permissão para realizar esta ação!",
        401,
      );
    }

    activityCategory.institution = await this.institutionsRepository.findById(
      activityCategory.institutionId,
    );

    return ActivityCategoryMap.toDTO(activityCategory);
  }
}

export { FindActivityCategoryByIdUseCase };
