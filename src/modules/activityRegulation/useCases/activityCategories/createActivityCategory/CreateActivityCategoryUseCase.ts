import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { ISaveActivityCategoryDTO } from "@modules/activityRegulation/dtos/activityCategory/ISaveActivityCategoryDTO";
import { IActivityCategoriesRepository } from "@modules/activityRegulation/repositories/IActivityCategoriesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateActivityCategoryUseCase {
  constructor(
    @inject("ActivityCategoriesRepository")
    private activityCategoriesRepository: IActivityCategoriesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}
  async execute(
    adminId: string,
    { name }: ISaveActivityCategoryDTO,
  ): Promise<void> {
    const adminUser = await this.usersRepository.findById(adminId);

    if (!adminUser.institutionId) {
      throw new AppError(
        "Para cadastrar uma categoria, você precisa estar vinculado a um campus.",
      );
    }

    const activityCategoryAlreadyExists =
      await this.activityCategoriesRepository.findByNameAndInstitutionId(
        name,
        adminUser.institutionId,
      );

    if (activityCategoryAlreadyExists) {
      throw new AppError("Já existe uma categoria cadastrada com esse nome.");
    }

    await this.activityCategoriesRepository.save({
      name,
      institutionId: adminUser.institutionId,
    });
  }
}

export { CreateActivityCategoryUseCase };
