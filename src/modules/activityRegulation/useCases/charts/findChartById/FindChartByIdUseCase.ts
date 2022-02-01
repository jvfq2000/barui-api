import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { IActivityResponseDTO } from "@modules/activityRegulation/dtos/activity/IActivityResponseDTO";
import { IChartResponseDTO } from "@modules/activityRegulation/dtos/chart/IChartResponseDTO";
import { ActivityMap } from "@modules/activityRegulation/mapper/ActivityMap";
import { ChartMap } from "@modules/activityRegulation/mapper/ChartMap";
import { IActivitiesRepository } from "@modules/activityRegulation/repositories/IActivitiesRepository";
import { IActivityCategoriesRepository } from "@modules/activityRegulation/repositories/IActivityCategoriesRepository";
import { IChartsRepository } from "@modules/activityRegulation/repositories/IChartsRepository";
import { ICoursesRepository } from "@modules/activityRegulation/repositories/ICoursesRepository";
import { AppError } from "@shared/errors/AppError";
import { accessLevel } from "@utils/permissions";

@injectable()
class FindChartByIdUseCase {
  constructor(
    @inject("ChartsRepository")
    private chartsRepository: IChartsRepository,
    @inject("ActivitiesRepository")
    private activitiesRepository: IActivitiesRepository,
    @inject("ActivityCategoriesRepository")
    private activityCategoriesRepository: IActivityCategoriesRepository,
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute(adminId: string, chartId: string): Promise<IChartResponseDTO> {
    const adminUser = await this.usersRepository.findById(adminId);

    if (!adminUser.institutionId) {
      throw new AppError("É necessário que você esteja vinculado a um campus.");
    }

    const chart = await this.chartsRepository.findById(chartId);

    const course = await this.coursesRepository.findById(chart.courseId);

    if (
      adminUser.accessLevel === accessLevel[3] &&
      adminUser.institutionId !== course.institutionId
    ) {
      throw new AppError(
        "Você não tem permissão para realizar esta ação!",
        401,
      );
    }

    chart.course = course;

    const activities = await this.activitiesRepository.listByChartId(chart.id);

    const activitiesFormat: IActivityResponseDTO[] = [];

    const activitiesPromise = activities.map(async activity => {
      const fullActivity = activity;

      fullActivity.chart = chart;

      fullActivity.category = await this.activityCategoriesRepository.findById(
        fullActivity.categoryId,
      );

      activitiesFormat.push(ActivityMap.toDTO(fullActivity));
    });

    await Promise.all(activitiesPromise);

    return ChartMap.toDTO(chart, activitiesFormat);
  }
}
export { FindChartByIdUseCase };
