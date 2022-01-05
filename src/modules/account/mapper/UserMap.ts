import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";

class UserMap {
  static toDTO(user: User): IUserResponseDTO {
    const userDTO: IUserResponseDTO = {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      identifier: user.identifier,
      telephone: user.telephone,
      initialSemester: user.initialSemester,
      registration: user.registration,
      avatar: user.avatar,
      accessLevel: user.accessLevel,
      isActive: user.isActive,
      courseId: user.courseId,
      course: user.course,
      institutionId: user.institutionId,
      institution: user.institution,
      avatarUrl: user.avatarUrl(),
      createdAt: user.createdAt,
    };

    return userDTO;
  }
}

export { UserMap };
