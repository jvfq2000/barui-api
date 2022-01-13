import { getRepository, Repository } from "typeorm";

import { IListUsersDTO } from "@modules/account/dtos/IListUsersDTO";
import { ISaveUserDTO } from "@modules/account/dtos/ISaveUserDTO";
import { User } from "@modules/account/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { IGeneralListDTO } from "@utils/IGeneralListDTO";

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
    identifier,
    telephone,
    initialSemester,
    registration,
    avatar,
    password,
    accessLevel,
    courseId,
    institutionId,
    isActive,
  }: ISaveUserDTO): Promise<void> {
    const user = this.repository.create({
      id,
      name,
      lastName,
      email,
      identifier,
      telephone,
      initialSemester,
      registration,
      avatar,
      password,
      accessLevel,
      courseId,
      institutionId,
      isActive,
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

  async list({
    userId,
    institutionId,
    page,
    registersPerPage,
    filter,
    isActive,
  }: IGeneralListDTO): Promise<IListUsersDTO> {
    let baseQuery = this.repository
      .createQueryBuilder("user")
      .leftJoinAndSelect(
        "user.institution",
        "institution",
        "institution.name like '%%'",
      )

      .where("(LOWER(user.name) like LOWER(:filter)")
      .orWhere("LOWER(institution.name) like LOWER(:filter)")
      .orWhere("LOWER(user.last_name) like LOWER(:filter)")
      .orWhere("LOWER(user.email) like LOWER(:filter)")
      .orWhere("LOWER(user.access_level) like LOWER(:filter)")
      .orWhere("LOWER(user.identifier) like LOWER(:filter)")
      .orWhere("to_char(user.created_at, 'DD/MM/YYYY') like LOWER(:filter))")
      .andWhere("user.is_active = :is_active")
      .andWhere("user.id != :user_id")

      .setParameter("filter", `%${filter}%`)
      .setParameter("is_active", isActive)
      .setParameter("user_id", userId);

    if (institutionId) {
      baseQuery = baseQuery
        .andWhere("user.institution_id = :institution_id")
        .setParameter("institution_id", institutionId);
    }

    const users = await baseQuery
      .skip(registersPerPage * (page - 1))
      .take(registersPerPage)
      .orderBy("user.name")
      .getMany();

    const totalCount = await baseQuery.getCount();

    return { users, totalCount };
  }

  async listByInstitutionId(institutionId: any): Promise<User[]> {
    const users = await this.repository.find({ institutionId });
    return users;
  }
}

export { UsersRepository };
