import { Course } from "@modules/activityRegulation/infra/typeorm/entities/Course";
import { Institution } from "@modules/activityRegulation/infra/typeorm/entities/Institution";

interface IUserResponseDTO {
  id: string;
  name: string;
  lastName: string;
  email: string;
  identifier: string;
  telephone: string;
  initialSemester: string;
  registration: string;
  avatar: string;
  accessLevel: string;
  isActive: boolean;
  courseId: string;
  course: Course;
  institutionId: string;
  institution: Institution;
  avatarUrl: string;
  createdAt: Date;
}

export { IUserResponseDTO };
