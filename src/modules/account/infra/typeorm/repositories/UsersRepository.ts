import { getRepository, Repository } from "typeorm";

import { IListUsersDTO } from "@modules/account/dtos/IListUsersDTO";
import { ISaveUserDTO } from "@modules/account/dtos/ISaveUserDTO";
import { User } from "@modules/account/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async save({
    id,
    name,
    lastName,
    email,
    password,
    avatar,
    accessLevel,
    isActive,
    identifier,
  }: ISaveUserDTO): Promise<void> {
    const user = this.repository.create({
      id,
      name,
      lastName,
      email,
      password,
      avatar,
      accessLevel,
      isActive,
      identifier,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }

  async list(
    page: number,
    registersPerPage: number,
    filter = "",
  ): Promise<IListUsersDTO> {
    const baseQuery = this.repository
      .createQueryBuilder("user")
      .where("LOWER(user.name) like LOWER(:filter)")
      .orWhere("LOWER(user.last_name) like LOWER(:filter)")
      .orWhere("LOWER(user.email) like LOWER(:filter)")
      .orWhere("LOWER(user.access_level) like LOWER(:filter)")
      .orWhere("LOWER(user.identifier) like LOWER(:filter)")
      .orWhere("to_char(created_at, 'DD/MM/YYYY') like LOWER(:filter)")
      .setParameter("filter", `%${filter}%`);

    const users = await baseQuery
      .skip(registersPerPage * (page - 1))
      .take(registersPerPage)
      .orderBy("user.name")
      .getMany();

    const totalCount = await baseQuery.getCount();

    return { users, totalCount };
  }
}

export { UsersRepository };