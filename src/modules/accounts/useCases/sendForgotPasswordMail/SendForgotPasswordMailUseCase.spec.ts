import { UsersRepositoryInMemory } from "@modules/accounts/repositories/inMemory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/inMemory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/inMemory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

describe("Send Forgot Password Mail", () => {
  beforeEach(() => {
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider,
    );
  });

  it("should be able to create an user token", async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      "create",
    );

    await usersRepositoryInMemory.create({
      name: "Devin Mitchell",
      lastName: "Caleb Barker",
      email: "okpeddu@udo.ni",
      password: "aC9f7I8T",
    });

    await sendForgotPasswordMailUseCase.execute("okpeddu@udo.ni");

    expect(generateTokenMail).toHaveBeenCalled();
  });

  it("should be able to send forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      name: "Rosie Briggs",
      lastName: "Jeff Porter",
      email: "mi@torkijeb.sd",
      password: "8l5CPJwC",
    });

    await sendForgotPasswordMailUseCase.execute("mi@torkijeb.sd");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send forgot password mail if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("naapkop@vot.dz"),
    ).rejects.toEqual(new AppError("Usuário não encontrado!"));
  });
});
