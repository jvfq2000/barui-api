import { IGeneralListDTO } from "@utils/IGeneralListDTO";

import { IListCoursesDTO } from "../dtos/course/IListCoursesDTO";
import { ISaveCourseDTO } from "../dtos/course/ISaveCourseDTO";
import { Course } from "../infra/typeorm/entities/Course";

interface ICoursesRepository {
  save(data: ISaveCourseDTO): Promise<void>;
  findByName(name: string): Promise<Course>;
  findById(id: string): Promise<Course>;
  listByInstitutionId(institutionId: string): Promise<Course[]>;
  list({
    institutionId,
    page,
    registersPerPage,
    filter,
    isActive,
  }: IGeneralListDTO): Promise<IListCoursesDTO>;
}

export { ICoursesRepository };
