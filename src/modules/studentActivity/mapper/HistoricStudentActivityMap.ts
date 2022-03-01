import { IHistoricStudentActivityResponseDTO } from "../dtos/historicStudentActivity/IHistoricStudentActivityResponseDTO";
import { HistoricStudentActivity } from "../infra/typeorm/entities/HistoricStudentActivity";

class HistoricStudentActivityMap {
  static toDTO(
    historicalStudentActivity: HistoricStudentActivity,
  ): IHistoricStudentActivityResponseDTO {
    const historicalStudentActivityDTO: IHistoricStudentActivityResponseDTO = {
      id: historicalStudentActivity.id,
      action: historicalStudentActivity.action,
      field: historicalStudentActivity.field,
      before: historicalStudentActivity.before,
      later: historicalStudentActivity.later,
      createdAt: historicalStudentActivity.createdAt,

      userId: historicalStudentActivity.userId,
      userName: `${historicalStudentActivity.user.name} ${historicalStudentActivity.user.lastName}`,

      studentActivityId: historicalStudentActivity.studentActivityId,
      studentActivityDescription:
        historicalStudentActivity.studentActivity.description,
    };

    return historicalStudentActivityDTO;
  }
}

export { HistoricStudentActivityMap };
