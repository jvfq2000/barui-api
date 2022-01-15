import { IGeneralListDTO } from "@utils/IGeneralListDTO";

import { IListCoursesDTO } from "../dtos/course/IListCoursesDTO";
import { ISaveCourseDTO } from "../dtos/course/ISaveCourseDTO";
import { Course } from "../infra/typeorm/entities/Course";

interface ICoursesRepository {
  save(data: ISaveCourseDTO): Promise<void>;
  findById(id: string): Promise<Course>;
  findByNameAndInstitutionId(
    name: string,
    institutionId: string,
  ): Promise<Course>;
  listByInstitutionId(institutionId: string): Promise<Course[]>;
  list(data: IGeneralListDTO): Promise<IListCoursesDTO>;
}

export { ICoursesRepository };
