import { inject, injectable } from "tsyringe";

import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { UserMap } from "@modules/accounts/mapper/UserMap";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IResponse {
  users: IUserResponseDTO[];
  totalCount: number;
}

interface IRequest {
  page: number;
  registersPerPage: number;
  filter: string;
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
  }: IRequest): Promise<IResponse> {
    const { users, totalCount } = await this.usersRepository.list(
      page || 1,
      registersPerPage || 10,
      filter || "",
    );
    const formatUsers: IUserResponseDTO[] = [];

    users.forEach(user => {
      formatUsers.push(UserMap.toDTO(user));
    });

    return { users: formatUsers, totalCount };
  }
}

export { ListUsersUseCase };
