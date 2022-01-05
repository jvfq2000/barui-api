import { IListCoursesDTO } from "../dtos/IListCoursesDTO";
import { ISaveCourseDTO } from "../dtos/ISaveCourseDTO";
import { Course } from "../infra/typeorm/entities/Course";

interface ICoursesRepository {
  save(data: ISaveCourseDTO): Promise<void>;
  findByName(name: string): Promise<Course>;
  findById(id: string): Promise<Course>;
  list(
    page: number,
    registersPerPage: number,
    filter?: string,
  ): Promise<IListCoursesDTO>;
}

export { ICoursesRepository };
