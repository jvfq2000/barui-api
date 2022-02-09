import { StudentActivity } from "../../infra/typeorm/entities/StudentActivity";

interface IListStudentActivitiesDTO {
  studentActivities: StudentActivity[];
  totalCount: number;
}

export { IListStudentActivitiesDTO };
