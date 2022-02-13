import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { IActivitiesRepository } from "@modules/activityRegulation/repositories/IActivitiesRepository";
import { ISaveStudentActivityDTO } from "@modules/studentActivity/dtos/studentActivity/ISaveStudentActivityDTO";
import { IHistoricStudentActivitiesRepository } from "@modules/studentActivity/repositories/IHistoricStudentActivitiesRepository";
import { IStudentActivitiesRepository } from "@modules/studentActivity/repositories/IStudentActivitiesRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { validateFindUserActivity } from "@utils/validateFindStudentActivity";

interface IRequest {
  currentUserId: string;
  userId: string;
  studentActivityRequest: ISaveStudentActivityDTO;
}

@injectable()
class UpdateStudentActivityUseCase {
  constructor(
    @inject("StudentActivitiesRepository")
    private studentActivitiesRepository: IStudentActivitiesRepository,
    @inject("ActivitiesRepository")
    private activitiesRepository: IActivitiesRepository,
    @inject("HistoricStudentActivitiesRepository")
    private historicStudentActivitiesRepository: IHistoricStudentActivitiesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
  ) {}

  async execute({
    currentUserId,
    userId,
    studentActivityRequest,
  }: IRequest): Promise<void> {
    const {
      id,
      activityId,
      description,
      hours,
      semester,
      isCertified,
      approvedHours,
      file,
      justification,
    } = studentActivityRequest;

    const studentActivity = await this.studentActivitiesRepository.findById(id);

    if (!studentActivity) {
      throw new AppError("Atividade complementar não encontrada.");
    }

    await validateFindUserActivity({
      studentActivity,
      usersRepository: this.usersRepository,
      currentUserId,
      userId,
    });

    const date = this.dateProvider.dateNow();

    if (studentActivity.activityId !== activityId) {
      const oldActivity = await this.activitiesRepository.findById(
        studentActivity.activityId,
      );

      const newActivity = await this.activitiesRepository.findById(activityId);

      await this.historicStudentActivitiesRepository.save({
        action: "Alteração",
        studentActivityId: studentActivity.id,
        userId: currentUserId,
        field: "Atividade",
        before: oldActivity.name,
        later: newActivity.name,
        createdAt: date,
      });
    }

    if (studentActivity.description !== description) {
      await this.historicStudentActivitiesRepository.save({
        action: "Alteração",
        studentActivityId: studentActivity.id,
        userId: currentUserId,
        field: "Descrição",
        before: studentActivity.description,
        later: description,
        createdAt: date,
      });
    }

    if (studentActivity.hours !== hours) {
      await this.historicStudentActivitiesRepository.save({
        action: "Alteração",
        studentActivityId: studentActivity.id,
        userId: currentUserId,
        field: "Qtd. horas",
        before: String(studentActivity.hours),
        later: String(hours),
        createdAt: date,
      });
    }

    if (studentActivity.semester !== semester) {
      await this.historicStudentActivitiesRepository.save({
        action: "Alteração",
        studentActivityId: studentActivity.id,
        userId: currentUserId,
        field: "Semestre",
        before: studentActivity.semester,
        later: semester,
        createdAt: date,
      });
    }

    if (studentActivity.isCertified !== isCertified) {
      await this.historicStudentActivitiesRepository.save({
        action: "Alteração",
        studentActivityId: studentActivity.id,
        userId: currentUserId,
        field: "Possui comprovação",
        before: studentActivity.isCertified ? "Sim" : "Não",
        later: isCertified ? "Sim" : "Não",
        createdAt: date,
      });
    }

    if (studentActivity.approvedHours !== approvedHours) {
      await this.historicStudentActivitiesRepository.save({
        action: "Alteração",
        studentActivityId: studentActivity.id,
        userId: currentUserId,
        field: "Horas aprovadas",
        before: String(studentActivity.approvedHours),
        later: String(approvedHours),
        createdAt: date,
      });
    }

    if (studentActivity.file !== file) {
      await this.historicStudentActivitiesRepository.save({
        action: "Alteração",
        studentActivityId: studentActivity.id,
        userId: currentUserId,
        field: "Comprovação",
        before: studentActivity.file,
        later: file,
        createdAt: date,
      });
    }

    if (studentActivity.file !== file) {
      await this.historicStudentActivitiesRepository.save({
        action: "Alteração",
        studentActivityId: studentActivity.id,
        userId: currentUserId,
        field: "Justificativa",
        before: studentActivity.justification,
        later: justification,
        createdAt: date,
      });
    }

    Object.assign(studentActivity, {
      activityId,
      description,
      hours,
      semester,
      isCertified,
      approvedHours,
      file,
      justification,
    });

    await this.studentActivitiesRepository.save(studentActivity);
  }
}

export { UpdateStudentActivityUseCase };
