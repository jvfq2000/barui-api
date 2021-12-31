import { IListUsersDTO } from "@modules/account/dtos/IListUserDTO";
import { ISaveUserDTO } from "@modules/account/dtos/ISaveUserDTO";
import { User } from "@modules/account/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";

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
  }: ISaveUserDTO): Promise<void> {
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
