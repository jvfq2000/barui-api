import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { IActivitiesRepository } from "@modules/activityRegulation/repositories/IActivitiesRepository";
import { IActivityCategoriesRepository } from "@modules/activityRegulation/repositories/IActivityCategoriesRepository";
import { IStudentActivityResponseDTO } from "@modules/studentActivity/dtos/studentActivity/IStudentActivityResponseDTO";
import { StudentActivityMap } from "@modules/studentActivity/mapper/StudentActivityMap";
import { IStudentActivitiesRepository } from "@modules/studentActivity/repositories/IStudentActivitiesRepository";
import { AppError } from "@shared/errors/AppError";
import { validateFindUserActivity } from "@utils/validateFindStudentActivity";

interface IRequest {
  currentUserId: string;
  userId: string;
  studentActivityId: string;
}

@injectable()
class FindStudentActivityByIdUseCase {
  constructor(
    @inject("StudentActivitiesRepository")
    private studentActivitiesRepository: IStudentActivitiesRepository,
    @inject("ActivitiesRepository")
    private activitiesRepository: IActivitiesRepository,
    @inject("ActivityCategoriesRepository")
    private activityCategoriesRepository: IActivityCategoriesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    currentUserId,
    userId,
    studentActivityId,
  }: IRequest): Promise<IStudentActivityResponseDTO> {
    const studentActivity = await this.studentActivitiesRepository.findById(
      studentActivityId,
    );

    if (!studentActivity) {
      throw new AppError("Atividade complementar não encontrada.");
    }

    await validateFindUserActivity({
      studentActivity,
      usersRepository: this.usersRepository,
      currentUserId,
      userId,
    });

    studentActivity.user = await this.usersRepository.findById(
      studentActivity.userId,
    );

    studentActivity.activity = await this.activitiesRepository.findById(
      studentActivity.activityId,
    );

    studentActivity.activity.category =
      await this.activityCategoriesRepository.findById(
        studentActivity.activity.categoryId,
      );

    return StudentActivityMap.toDTO(studentActivity);
  }
}

export { FindStudentActivityByIdUseCase };
