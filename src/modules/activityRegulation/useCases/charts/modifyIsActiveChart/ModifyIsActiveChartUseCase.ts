import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { IChartsRepository } from "@modules/activityRegulation/repositories/IChartsRepository";
import { ICoursesRepository } from "@modules/activityRegulation/repositories/ICoursesRepository";
import { AppError } from "@shared/errors/AppError";
import { accessLevel } from "@utils/permissions";

@injectable()
class ModifyIsActiveChartUseCase {
  constructor(
    @inject("ChartsRepository")
    private chartsRepository: IChartsRepository,
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute(adminId: string, chartId: string): Promise<void> {
    const adminUser = await this.usersRepository.findById(adminId);

    if (!adminUser.institutionId) {
      throw new AppError("É necessário que você esteja vinculado a um campus.");
    }

    const chart = await this.chartsRepository.findById(chartId);

    if (!chart) {
      throw new AppError("Quadro não encontrado.");
    }

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

    chart.isActive = !chart.isActive;

    await this.chartsRepository.save(chart);
  }
}

export { ModifyIsActiveChartUseCase };
