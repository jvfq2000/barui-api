import { inject, injectable } from "tsyringe";

import { IActivityResponseDTO } from "@modules/activityRegulation/dtos/activity/IActivityResponseDTO";
import { ActivityMap } from "@modules/activityRegulation/mapper/ActivityMap";
import { IActivitiesRepository } from "@modules/activityRegulation/repositories/IActivitiesRepository";
import { IActivityCategoriesRepository } from "@modules/activityRegulation/repositories/IActivityCategoriesRepository";
import { IChartsRepository } from "@modules/activityRegulation/repositories/IChartsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class FindActivitiesByChartIdAndCategoryIdUseCase {
  constructor(
    @inject("ActivitiesRepository")
    private activitiesRepository: IActivitiesRepository,
    @inject("ChartsRepository")
    private chartsRepository: IChartsRepository,
    @inject("ActivityCategoriesRepository")
    private activityCategoriesRepository: IActivityCategoriesRepository,
  ) {}

  async execute(
    chartId: string,
    categoryId: string,
  ): Promise<IActivityResponseDTO[]> {
    const chart = await this.chartsRepository.findById(chartId);

    if (!chart) {
      throw new AppError("Quadro não encontrado");
    }

    const category = await this.activityCategoriesRepository.findById(
      categoryId,
    );

    if (!category) {
      throw new AppError("Categoria não encontrada");
    }

    const activities =
      await this.activitiesRepository.listByChartIdAndCategoryId(
        chartId,
        categoryId,
      );

    const fullActivities: IActivityResponseDTO[] = [];

    activities.forEach(activity => {
      const fullActivity = activity;

      fullActivity.category = category;
      fullActivity.chart = chart;

      fullActivities.push(ActivityMap.toDTO(fullActivity));
    });

    return fullActivities;
  }
}
export { FindActivitiesByChartIdAndCategoryIdUseCase };
