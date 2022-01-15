import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { IRegulationResponseDTO } from "@modules/activityRegulation/dtos/regulation/IRegulationResponseDTO";
import { RegulationMap } from "@modules/activityRegulation/mapper/regulationMap";
import { ICoursesRepository } from "@modules/activityRegulation/repositories/ICoursesRepository";
import { IRegulationsRepository } from "@modules/activityRegulation/repositories/IRegulationsRepository";
import { AppError } from "@shared/errors/AppError";
import { accessLevel as accessLevelPermissions } from "@utils/permissions";

@injectable()
class FindRegulationByIdUseCase {
  constructor(
    @inject("RegulationsRepository")
    private regulationsRepository: IRegulationsRepository,
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute(
    adminId: string,
    regulationId: string,
  ): Promise<IRegulationResponseDTO> {
    const regulation = await this.regulationsRepository.findById(regulationId);

    if (!regulation) {
      throw new AppError("Regulamento não encontrado.");
    }

    regulation.course = await this.coursesRepository.findById(
      regulation.courseId,
    );

    const adminUser = await this.usersRepository.findById(adminId);

    if (
      adminUser.accessLevel === accessLevelPermissions[3] &&
      adminUser.institutionId !== regulation.course.institutionId
    ) {
      throw new AppError(
        "Você não tem permissão para realizar esta ação!",
        401,
      );
    }

    return RegulationMap.toDTO(regulation);
  }
}

export { FindRegulationByIdUseCase };
