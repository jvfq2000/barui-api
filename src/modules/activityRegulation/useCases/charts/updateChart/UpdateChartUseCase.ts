import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { ISaveChartDTO } from "@modules/activityRegulation/dtos/chart/ISaveChartDTO";
import { IActivitiesRepository } from "@modules/activityRegulation/repositories/IActivitiesRepository";
import { IChartsRepository } from "@modules/activityRegulation/repositories/IChartsRepository";
import { ICoursesRepository } from "@modules/activityRegulation/repositories/ICoursesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class UpdateChartUseCase {
  constructor(
    @inject("ChartsRepository")
    private chartsRepository: IChartsRepository,
    @inject("ActivitiesRepository")
    private activitiesRepository: IActivitiesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository,
  ) {}
  async execute(
    adminId: string,
    { id, name, inForceFrom, minHours, courseId, activities }: ISaveChartDTO,
  ): Promise<void> {
    if (!activities || activities.length === 0) {
      throw new AppError(
        "Por favor, informe as atividades complementares deste quadro.",
      );
    }

    const chart = await this.chartsRepository.findById(id);

    if (!chart) {
      throw new AppError("Quadro não encontrado.");
    }

    const user = await this.usersRepository.findById(adminId);

    const newCorseId = user.courseId || courseId;

    const course = await this.coursesRepository.findById(newCorseId);

    if (!course) {
      throw new AppError("Curso não encontrado.");
    }

    if (course.institutionId !== user.institutionId) {
      throw new AppError(
        "Para alterar um quadro de atividades, você precisa estar vinculado a um campus.",
      );
    }

    Object.assign(chart, {
      name,
      inForceFrom,
      minHours,
      courseId: newCorseId,
    });

    await this.chartsRepository.save(chart);

    activities.map(activity => {
      const fullActivity = activity;

      fullActivity.chartId = chart.id;
      return fullActivity;
    });

    await this.activitiesRepository.save(activities);
  }
}

export { UpdateChartUseCase };
