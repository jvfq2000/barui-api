import { IStudentActivityResponseDTO } from "../dtos/studentActivity/IStudentActivityResponseDTO";
import { StudentActivity } from "../infra/typeorm/entities/StudentActivity";

class StudentActivityMap {
  static toDTO(studentActivity: StudentActivity): IStudentActivityResponseDTO {
    const studentActivityDTO: IStudentActivityResponseDTO = {
      id: studentActivity.id,
      description: studentActivity.description,
      hours: studentActivity.hours,
      semester: studentActivity.semester,
      isCertified: studentActivity.isCertified,
      justification: studentActivity.justification,
      file: studentActivity.file,
      approvedHours: studentActivity.approvedHours,
      isActive: studentActivity.isActive,
      createdAt: studentActivity.createdAt,

      userId: studentActivity.userId,
      userName: studentActivity.user.name,

      categoryId: studentActivity.activity.categoryId,
      categoryName: studentActivity.activity.category.name,

      activityId: studentActivity.activityId,
      activityName: studentActivity.activity.name,
    };

    return studentActivityDTO;
  }
}

export { StudentActivityMap };
