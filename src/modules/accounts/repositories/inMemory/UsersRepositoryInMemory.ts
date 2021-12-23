import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IListUsersDTO } from "@modules/accounts/dtos/IListUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({
    name,
    lastName,
    email,
    password,
    accessLevel,
    isActive,
    identifier,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      name,
      lastName,
      email,
      password,
      accessLevel,
      identifier,
      isActive: isActive === undefined || isActive === true,
    });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email);
  }

  async findById(id: string): Promise<User> {
    return this.users.find(user => user.id === id);
  }

  async list(page: number, registersPerPage: number): Promise<IListUsersDTO> {
    return { users: this.users, totalCount: this.users.length };
  }
}

export { UsersRepositoryInMemory };
