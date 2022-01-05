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
    const formatedUsers: IUserResponseDTO[] = [];

    users.forEach(user => {
      formatedUsers.push(UserMap.toDTO(user));
    });

    return { users: formatedUsers, totalCount };
  }
}

export { ListUsersUseCase };
