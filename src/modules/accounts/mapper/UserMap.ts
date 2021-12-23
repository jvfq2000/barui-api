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
      createdAt: user.createdAt,
      avatar: user.avatar,
      accessLevel: user.accessLevel,
      isActive: user.isActive,
      avatarUrl: user.avatarUrl(),
    };

    return userDTO;
  }
}

export { UserMap };
