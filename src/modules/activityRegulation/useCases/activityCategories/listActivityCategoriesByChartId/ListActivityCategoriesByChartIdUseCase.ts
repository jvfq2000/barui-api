import { inject, injectable } from "tsyringe";

import { IActivityResponseDTO } from "@modules/activityRegulation/dtos/activity/IActivityResponseDTO";
import { IActivityCategoryResponseDTO } from "@modules/activityRegulation/dtos/activityCategory/IActivityCategoryResponseDTO";
import { IChartResponseDTO } from "@modules/activityRegulation/dtos/chart/IChartResponseDTO";
import { ActivityCategoryMap } from "@modules/activityRegulation/mapper/ActivityCategoryMap";
import { ActivityMap } from "@modules/activityRegulation/mapper/ActivityMap";
import { ChartMap } from "@modules/activityRegulation/mapper/ChartMap";
import { IActivityCategoriesRepository } from "@modules/activityRegulation/repositories/IActivityCategoriesRepository";
import { IChartsRepository } from "@modules/activityRegulation/repositories/IChartsRepository";
import { IInstitutionsRepository } from "@modules/activityRegulation/repositories/IInstitutionsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ListActivityCategoriesByChartIdUseCase {
  constructor(
    @inject("ChartsRepository")
    private chartsRepository: IChartsRepository,
    @inject("InstitutionsRepository")
    private institutionsRepository: IInstitutionsRepository,
    @inject("ActivityCategoriesRepository")
    private activityCategoriesRepository: IActivityCategoriesRepository,
  ) {}
  async execute(chartId: string): Promise<IActivityCategoryResponseDTO[]> {
    const chart = await this.chartsRepository.findById(chartId);

    if (!chart) {
      throw new AppError("Quadro não encontrado.");
    }

    const categories = await this.activityCategoriesRepository.listByChartId(
      chartId,
    );

    const categoriesFormat: IActivityCategoryResponseDTO[] = [];

    const categoriesPromise = categories.map(async category => {
      const fullCategory = category;

      fullCategory.institution = await this.institutionsRepository.findById(
        fullCategory.institutionId,
      );

      categoriesFormat.push(ActivityCategoryMap.toDTO(fullCategory));
    });

    await Promise.all(categoriesPromise);

    return categoriesFormat;
  }
}

export { ListActivityCategoriesByChartIdUseCase };
