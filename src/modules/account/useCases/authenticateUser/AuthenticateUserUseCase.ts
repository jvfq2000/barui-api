import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/account/repositories/IUsersTokensRepository";
import { IInstitutionsRepository } from "@modules/activityRegulation/repositories/IInstitutionsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    lastName: string;
    email: string;
    avatar: string;
    avatarUrl: string;
    identifier: string;
    accessLevel: string;
  };
  token: string;
  refreshToken: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("InstitutionsRepository")
    private institutionsRepository: IInstitutionsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    const {
      expiresInToken,
      secretRefreshToken,
      secretToken,
      expiresInRefreshToken,
      expiresRefreshTokenDays,
    } = auth;

    if (!user) {
      throw new AppError("E-mail ou senha incorretos!", 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("E-mail ou senha incorretos!", 401);
    }

    if (!user.isActive) {
      throw new AppError(
        "Usuário está inativo, procure um administrador para mais informações!",
        401,
      );
    }

    if (user.institutionId) {
      const institution = await this.institutionsRepository.findById(
        user.institutionId,
      );

      if (!institution.isActive) {
        throw new AppError(
          "Usuário está inativo, procure um administrador para mais informações!",
          401,
        );
      }
    }

    const token = sign({ accessLevel: user.accessLevel }, secretToken, {
      subject: user.id,
      expiresIn: expiresInToken,
    });

    const refreshToken = sign({ email }, secretRefreshToken, {
      subject: user.id,
      expiresIn: expiresInRefreshToken,
    });

    const refreshTokenExpiresDate = this.dateProvider.addDays(
      expiresRefreshTokenDays,
    );

    await this.usersTokensRepository.create({
      userId: user.id,
      refreshToken,
      expiresDate: refreshTokenExpiresDate,
    });

    const tokenReturn: IResponse = {
      user: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        avatar: user.avatar,
        avatarUrl: user.avatarUrl(),
        identifier: user.identifier,
        accessLevel: user.accessLevel,
      },
      token,
      refreshToken,
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
