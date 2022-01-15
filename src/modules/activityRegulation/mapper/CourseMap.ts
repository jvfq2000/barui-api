import { ICourseResponseDTO } from "../dtos/course/ICourseResponseDTO";
import { Course } from "../infra/typeorm/entities/Course";

class CourseMap {
  static toDTO(course: Course): ICourseResponseDTO {
    const courseDTO: ICourseResponseDTO = {
      id: course.id,
      name: course.name,
      numberPeriods: course.numberPeriods,
      isActive: course.isActive,
      createdAt: course.createdAt,

      institutionId: course.institutionId,
      institutionName: course.institution.name,
    };

    return courseDTO;
  }
}

export { CourseMap };
