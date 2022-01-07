import { inject, injectable } from "tsyringe";

import { IUserResponseDTO } from "@modules/account/dtos/IUserResponseDTO";
import { UserMap } from "@modules/account/mapper/UserMap";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";

interface IResponse {
  users: IUserResponseDTO[];
  totalCount: number;
}

interface IRequest {
  page: number;
  registersPerPage: number;
  filter: string;
  isActive: boolean;
}

@injectable()
class ListUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    page,
    registersPerPage,
    filter,
    isActive,
  }: IRequest): Promise<IResponse> {
    const { users, totalCount } = await this.usersRepository.list(
      page || 1,
      registersPerPage || 10,
      filter || "",
    );
    const formattedUsers: IUserResponseDTO[] = [];
    let totalCountIsActive = totalCount;

    users.forEach(user => {
      if (user.isActive === isActive) {
        formattedUsers.push(UserMap.toDTO(user));
      } else {
        totalCountIsActive -= 1;
      }
    });

    return { users: formattedUsers, totalCount: totalCountIsActive };
  }
}

export { ListUsersUseCase };
