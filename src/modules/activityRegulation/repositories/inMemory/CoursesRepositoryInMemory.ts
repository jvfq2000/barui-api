import { v4 as uuidV4 } from "uuid";

import { IListCoursesDTO } from "@modules/activityRegulation/dtos/IListCoursesDTO";
import { ISaveCourseDTO } from "@modules/activityRegulation/dtos/ISaveCourseDTO";
import { Course } from "@modules/activityRegulation/infra/typeorm/entities/Course";

import { ICoursesRepository } from "../ICoursesRepository";

class CoursesRepositoryInMemory implements ICoursesRepository {
  courses: Course[] = [];

  async save({
    id,
    name,
    numberPeriods,
    institutionId,
    isActive,
  }: ISaveCourseDTO): Promise<void> {
    const course = new Course();

    Object.assign(course, {
      id: id || uuidV4(),
      name,
      numberPeriods,
      institutionId,
      isActive: isActive === undefined || isActive === true,
    });

    this.courses.push(course);
  }

  async findByName(name: string): Promise<Course> {
    return this.courses.find(course => course.name === name);
  }

  async findById(id: string): Promise<Course> {
    return this.courses.find(course => course.id === id);
  }

  async list(
    page: number,
    registersPerPage: number,
    filter?: string,
  ): Promise<IListCoursesDTO> {
    return {
      courses: this.courses,
      totalCount: this.courses.length,
    };
  }
}

export { CoursesRepositoryInMemory };
