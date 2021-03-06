import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/account/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("MailProvider")
    private mailProvider: IMailProvider,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Usuário não encontrado!");
    }

    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "forgotPassword.hbs",
    );

    const token = uuidV4();

    const expiresDate = this.dateProvider.addHours(3);

    await this.usersTokensRepository.create({
      userId: user.id,
      refreshToken: token,
      expiresDate,
    });

    const variables = {
      name: user.name,
      token,
    };

    this.mailProvider.sendMail(
      email,
      "Recuperar senha",
      variables,
      templatePath,
    );
  }
}

export { SendForgotPasswordMailUseCase };
