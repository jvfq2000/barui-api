import { ICreateUserTokenDTO } from "@modules/account/dtos/ICreateUserTokenDTO";
import { UserToken } from "@modules/account/infra/typeorm/entities/UserToken";

import { IUsersTokensRepository } from "../IUsersTokensRepository";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UserToken[] = [];

  async create({
    expiresDate,
    refreshToken,
    userId,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      expiresDate,
      refreshToken,
      userId,
    });

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<UserToken> {
    const userToken = this.usersTokens.find(
      ut => ut.userId === userId && ut.refreshToken === refreshToken,
    );
    return userToken;
  }

  async findByRefreshToken(refreshToken: string): Promise<UserToken> {
    const userToken = this.usersTokens.find(
      ut => ut.refreshToken === refreshToken,
    );
    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    const userToken = this.usersTokens.find(ut => ut.id === id);
    this.usersTokens.splice(this.usersTokens.indexOf(userToken));
  }

  async deleteByUserId(userId: string): Promise<void> {
    const usersTokensFilter = this.usersTokens.filter(
      ut => ut.userId === userId,
    );

    usersTokensFilter.forEach(ut => {
      this.usersTokens.splice(this.usersTokens.indexOf(ut));
    });
  }
}

export { UsersTokensRepositoryInMemory };
