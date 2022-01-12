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
      avatarUrl: user.avatarUrl(),
      accessLevel: user.accessLevel,
      isActive: user.isActive,
      createdAt: user.createdAt,

      courseId: user.courseId,
      courseName: user.course?.name,
      courseNumberPeriods: user.course?.numberPeriods,

      institutionId: user.institutionId,
      institutionName: user.institution?.name,

      cityId: user.institution?.cityId,
      cityName: user.institution?.city?.name,
      stateId: user.institution?.city?.stateId,
      stateName: user.institution?.city?.state?.name,
    };

    return userDTO;
  }
}

export { UserMap };
