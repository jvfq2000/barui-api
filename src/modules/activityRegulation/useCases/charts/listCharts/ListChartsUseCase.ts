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
import { IGeneralListDTO } from "@utils/IGeneralListDTO";
import { accessLevel } from "@utils/permissions";

interface IResponse {
  charts: IChartResponseDTO[];
  totalCount: number;
}

@injectable()
class ListChartsUseCase {
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

  async execute({
    userId,
    page,
    registersPerPage,
    filter,
    isActive,
  }: IGeneralListDTO): Promise<IResponse> {
    const user = await this.usersRepository.findById(userId);

    const courseId = user.accessLevel <= accessLevel[2] ? user.courseId : null;

    const institutionId =
      user.accessLevel === accessLevel[3] ? user.institutionId : null;

    const { charts, totalCount } = await this.chartsRepository.list({
      institutionId,
      courseId,
      page: page || 1,
      registersPerPage: registersPerPage || 10,
      filter: filter || "",
      isActive,
    });

    const chartsFormatted: IChartResponseDTO[] = [];

    const chartsPromise = charts.map(async chart => {
      const fullChart = chart;

      fullChart.course = await this.coursesRepository.findById(
        fullChart.courseId,
      );

      const activities = await this.activitiesRepository.listByChartId(
        fullChart.id,
      );

      const activitiesFormat: IActivityResponseDTO[] = [];

      const activitiesPromise = activities.map(async activity => {
        const fullActivity = activity;

        fullActivity.chart = fullChart;

        fullActivity.category =
          await this.activityCategoriesRepository.findById(
            fullActivity.categoryId,
          );

        activitiesFormat.push(ActivityMap.toDTO(fullActivity));
      });

      await Promise.all(activitiesPromise);

      chartsFormatted.push(ChartMap.toDTO(fullChart, activitiesFormat));
    });

    await Promise.all(chartsPromise);

    return { charts: chartsFormatted, totalCount };
  }
}
export { ListChartsUseCase };
