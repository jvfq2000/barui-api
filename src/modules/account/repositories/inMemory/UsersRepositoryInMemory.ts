import { IListUsersDTO } from "@modules/account/dtos/IListUsersDTO";
import { ISaveUserDTO } from "@modules/account/dtos/ISaveUserDTO";
import { User } from "@modules/account/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [
    {
      id: "a79e1e38-62bf-5223-9be4-f5081c33eec7",
      lastName: "Rachel Bryant",
      name: "Edgar Gonzales",
      email: "vuplure@deasabej.do",
      avatar: "sgggjdqnepq",
      identifier: "08161375352",
      initialSemester: "1/2022",
      isActive: true,
      password: "d1tF9cyX",
      registration: "22224",
      telephone: "(963) 617-5402",
      avatarUrl: () => "http://hupmo.mm/genappuc",
      accessLevel: "administrador geral",
      institution: null,
      institutionId: null,
      course: null,
      courseId: null,
      createdAt: new Date(),
    },
  ];

  async save({
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
