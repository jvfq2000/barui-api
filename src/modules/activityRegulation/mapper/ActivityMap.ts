import { IActivityResponseDTO } from "../dtos/activity/IActivityResponseDTO";
import { Activity } from "../infra/typeorm/entities/Activity";

class ActivityMap {
  static toDTO(activity: Activity): IActivityResponseDTO {
    const activityDTO: IActivityResponseDTO = {
      id: activity.id,
      name: activity.name,
      maxHours: activity.maxHours,
      minHours: activity.minHours,
      isActive: activity.isActive,
      createdAt: activity.createdAt,

      chartId: activity.chartId,
      chartName: activity.chart.name,

      categoryId: activity.categoryId,
      categoryName: activity.category.name,
    };

    return activityDTO;
  }
}

export { ActivityMap };
