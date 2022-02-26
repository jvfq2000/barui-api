import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { IStudentResponseDTO } from "@modules/studentActivity/dtos/studentActivity/IStudentResponseDTO";
import { IStudentActivitiesRepository } from "@modules/studentActivity/repositories/IStudentActivitiesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ListStudentsUseCase {
  constructor(
    @inject("StudentActivitiesRepository")
    private studentActivitiesRepository: IStudentActivitiesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute(currentUserId: string): Promise<IStudentResponseDTO[]> {
    const currentUser = await this.usersRepository.findById(currentUserId);

    if (!currentUser.courseId) {
      throw new AppError(
        "Para listar os alunos com atividades, você precisa estar vinculado a um curso.",
      );
    }

    const students = await this.usersRepository.listStudentsByCourseId(
      currentUser.courseId,
    );

    const formattedStudents: IStudentResponseDTO[] = [];

    const studentsPromise = students.map(async student => {
      const studentActivities =
        await this.studentActivitiesRepository.listByStudentId(student.id);

      const hours = studentActivities.reduce(
        (acc, studentActivity) => {
          acc.registeredHours += studentActivity.hours;

          if (studentActivity.approvedHours) {
            acc.approvedHours += studentActivity.approvedHours;

            acc.rejectedHours +=
              studentActivity.hours - studentActivity.approvedHours < 0
                ? 0
                : studentActivity.hours - studentActivity.approvedHours;
          } else {
            acc.hoursNotAnalyzed += studentActivity.hours;
          }

          return acc;
        },
        {
          registeredHours: 0,
          approvedHours: 0,
          hoursNotAnalyzed: 0,
          rejectedHours: 0,
        },
      );

      formattedStudents.push({
        userId: student.id,
        userName: `${student.name} ${student.lastName}`,
        avatar: student.avatar,
        avatarUrl: student.avatarUrl(),
        initialSemester: student.initialSemester,
        registeredHours: hours.registeredHours,
        approvedHours: hours.approvedHours,
        hoursNotAnalyzed: hours.hoursNotAnalyzed,
        rejectedHours: hours.rejectedHours,
      });
    });

    await Promise.all(studentsPromise);

    return formattedStudents;
  }
}

export { ListStudentsUseCase };
