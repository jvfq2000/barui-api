import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { ISaveActivityCategoryDTO } from "@modules/activityRegulation/dtos/activityCategory/ISaveActivityCategoryDTO";
import { ActivityCategory } from "@modules/activityRegulation/infra/typeorm/entities/ActivityCategory";
import { IActivityCategoriesRepository } from "@modules/activityRegulation/repositories/IActivityCategoriesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class UpdateActivityCategoryUseCase {
  constructor(
    @inject("ActivityCategoriesRepository")
    private activityCategoriesRepository: IActivityCategoriesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute(
    adminId: string,
    { id, name }: ISaveActivityCategoryDTO,
  ): Promise<ActivityCategory> {
    const adminUser = await this.usersRepository.findById(adminId);

    if (!adminUser.institutionId) {
      throw new AppError(
        "Para alterar uma categoria, você precisa estar vinculado a um campus.",
      );
    }

    let activityCategory = await this.activityCategoriesRepository.findById(id);

    if (!activityCategory) {
      throw new AppError("Categoria não encontrada.");
    }

    Object.assign(activityCategory, {
      id,
      name,
      institutionId: adminUser.institutionId,
    });

    await this.activityCategoriesRepository.save(activityCategory);

    activityCategory = await this.activityCategoriesRepository.findById(id);

    return activityCategory;
  }
}

export { UpdateActivityCategoryUseCase };
