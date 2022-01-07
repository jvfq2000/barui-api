import { Course } from "../../infra/typeorm/entities/Course";

interface IListCoursesDTO {
  courses: Course[];
  totalCount: number;
}

export { IListCoursesDTO };
