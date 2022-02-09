import { HistoricStudentActivity } from "@modules/studentActivity/infra/typeorm/entities/HistoricStudentActivity";

interface IListHistoricStudentActivitiesDTO {
  historicStudentActivity: HistoricStudentActivity[];
  totalCount: number;
}

export { IListHistoricStudentActivitiesDTO };
