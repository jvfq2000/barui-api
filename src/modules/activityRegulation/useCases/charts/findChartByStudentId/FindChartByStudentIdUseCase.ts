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

@injectable()
class FindChartByStudentIdUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("ChartsRepository")
    private chartsRepository: IChartsRepository,
    @inject("ActivitiesRepository")
    private activitiesRepository: IActivitiesRepository,
    @inject("ActivityCategoriesRepository")
    private activityCategoriesRepository: IActivityCategoriesRepository,
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository,
  ) {}
  async execute(userId: string): Promise<IChartResponseDTO> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError("Usuário não encontrado.");
    }

    if (user.accessLevel !== "aluno") {
      throw new AppError("Somente alunos podem cadastrar atividades.");
    }

    const chart = await this.chartsRepository.findByStudentId(user.id);

    const course = await this.coursesRepository.findById(chart.courseId);

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

export { FindChartByStudentIdUseCase };
