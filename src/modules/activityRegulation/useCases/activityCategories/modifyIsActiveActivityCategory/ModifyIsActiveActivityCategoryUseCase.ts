import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { IActivityCategoriesRepository } from "@modules/activityRegulation/repositories/IActivityCategoriesRepository";
import { AppError } from "@shared/errors/AppError";
import { accessLevel } from "@utils/permissions";

@injectable()
class ModifyIsActiveActivityCategoryUseCase {
  constructor(
    @inject("ActivityCategoriesRepository")
    private activityCategoriesRepository: IActivityCategoriesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute(adminId: string, activityCategoryId: string): Promise<void> {
    const activityCategory = await this.activityCategoriesRepository.findById(
      activityCategoryId,
    );

    if (!activityCategory) {
      throw new AppError("Categoria não encontrado.");
    }

    const adminUser = await this.usersRepository.findById(adminId);

    if (
      adminUser.accessLevel === accessLevel[3] &&
      adminUser.institutionId !== activityCategory.institutionId
    ) {
      throw new AppError(
        "Você não tem permissão para realizar esta ação!",
        401,
      );
    }

    activityCategory.isActive = !activityCategory.isActive;

    await this.activityCategoriesRepository.save(activityCategory);
  }
}

export { ModifyIsActiveActivityCategoryUseCase };
