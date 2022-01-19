import { IActivityCategoryResponseDTO } from "../dtos/activityCategory/IActivityCategoryResponseDTO";
import { ActivityCategory } from "../infra/typeorm/entities/ActivityCategory";

class ActivityCategoryMap {
  static toDTO(
    activityCategory: ActivityCategory,
  ): IActivityCategoryResponseDTO {
    const activityCategoryDTO: IActivityCategoryResponseDTO = {
      id: activityCategory.id,
      name: activityCategory.name,
      isActive: activityCategory.isActive,
      createdAt: activityCategory.createdAt,

      institutionId: activityCategory.institutionId,
      institutionName: activityCategory.institution.name,
    };

    return activityCategoryDTO;
  }
}

export { ActivityCategoryMap };
