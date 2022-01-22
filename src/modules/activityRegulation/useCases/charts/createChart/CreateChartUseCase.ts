import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { ISaveChartDTO } from "@modules/activityRegulation/dtos/chart/ISaveChartDTO";
import { IActivitiesRepository } from "@modules/activityRegulation/repositories/IActivitiesRepository";
import { IChartsRepository } from "@modules/activityRegulation/repositories/IChartsRepository";
import { ICoursesRepository } from "@modules/activityRegulation/repositories/ICoursesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateChartUseCase {
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
    { name, inForceFrom, courseId, activities }: ISaveChartDTO,
  ): Promise<void> {
    if (!activities) {
      throw new AppError(
        "Por favor, informe as atividades complementares deste quadro.",
      );
    }

    const user = await this.usersRepository.findById(adminId);

    const newCorseId = user.courseId || courseId;

    const course = await this.coursesRepository.findById(newCorseId);

    if (!course) {
      throw new AppError("Curso não encontrado.");
    }

    if (course.institutionId !== user.institutionId) {
      throw new AppError(
        "Para cadastrar um quadro de atividades, você precisa estar vinculado a um campus.",
      );
    }

    const chartAlreadyExists =
      await this.chartsRepository.findByNameAndCourseId(name, newCorseId);

    if (chartAlreadyExists) {
      throw new AppError("Já existe um quadro de atividades com esse nome.");
    }

    await this.chartsRepository.save({
      name,
      inForceFrom,
      courseId: newCorseId,
    });

    const chart = await this.chartsRepository.findByNameAndCourseId(
      name,
      newCorseId,
    );

    activities.map(activity => {
      const fullActivity = activity;

      fullActivity.chartId = chart.id;
      return fullActivity;
    });

    await this.activitiesRepository.save(activities);
  }
}

export { CreateChartUseCase };
