import { inject, injectable } from "tsyringe";

import { User } from "@modules/account/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { IActivitiesRepository } from "@modules/activityRegulation/repositories/IActivitiesRepository";
import { IActivityCategoriesRepository } from "@modules/activityRegulation/repositories/IActivityCategoriesRepository";
import { IStudentActivityResponseDTO } from "@modules/studentActivity/dtos/studentActivity/IStudentActivityResponseDTO";
import { StudentActivityMap } from "@modules/studentActivity/mapper/StudentActivityMap";
import { IStudentActivitiesRepository } from "@modules/studentActivity/repositories/IStudentActivitiesRepository";
import { AppError } from "@shared/errors/AppError";
import { IGeneralListDTO } from "@utils/IGeneralListDTO";
import { accessLevel } from "@utils/permissions";

interface IResponse {
  StudentActivities: IStudentActivityResponseDTO[];
  totalCount: number;
}

@injectable()
class ListStudentActivitiesUseCase {
  constructor(
    @inject("StudentActivitiesRepository")
    private studentActivitiesRepository: IStudentActivitiesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("ActivitiesRepository")
    private activitiesRepository: IActivitiesRepository,
    @inject("ActivityCategoriesRepository")
    private activityCategoriesRepository: IActivityCategoriesRepository,
  ) {}

  async execute(
    currentUserId: string,
    { userId, page, registersPerPage, filter, isActive }: IGeneralListDTO,
  ): Promise<IResponse> {
    let filterUser: User;

    const currentUser = await this.usersRepository.findById(currentUserId);

    if (currentUser.accessLevel === accessLevel[0]) {
      filterUser = currentUser;
    } else {
      const user = await this.usersRepository.findById(userId);

      if (user.accessLevel !== accessLevel[0]) {
        throw new AppError(
          "Não é possível listar atividades de um usuário, que não seja aluno.",
        );
      } else {
        if (
          (currentUser.accessLevel === accessLevel[1] ||
            currentUser.accessLevel === accessLevel[2]) &&
          currentUser.courseId !== user.courseId
        ) {
          throw new AppError(
            "Você não tem permissão para realizar esta ação!",
            401,
          );
        }

        if (
          currentUser.accessLevel === accessLevel[3] &&
          currentUser.institutionId !== user.institutionId
        ) {
          throw new AppError(
            "Você não tem permissão para realizar esta ação!",
            401,
          );
        }

        filterUser = user;
      }
    }

    const { studentActivities, totalCount } =
      await this.studentActivitiesRepository.list({
        userId: filterUser.id,
        page: page || 1,
        registersPerPage: registersPerPage || 10,
        filter: filter || "",
        isActive,
      });

    const formattedStudentActivities: IStudentActivityResponseDTO[] = [];

    const studentActivitiesPromise = studentActivities.map(
      async studentActivity => {
        const fullStudentActivity = studentActivity;

        fullStudentActivity.user = filterUser;

        fullStudentActivity.activity = await this.activitiesRepository.findById(
          fullStudentActivity.activityId,
        );

        fullStudentActivity.activity.category =
          await this.activityCategoriesRepository.findById(
            fullStudentActivity.activity.categoryId,
          );

        formattedStudentActivities.push(
          StudentActivityMap.toDTO(fullStudentActivity),
        );
      },
    );

    await Promise.all(studentActivitiesPromise);

    return { StudentActivities: formattedStudentActivities, totalCount };
  }
}

export { ListStudentActivitiesUseCase };
