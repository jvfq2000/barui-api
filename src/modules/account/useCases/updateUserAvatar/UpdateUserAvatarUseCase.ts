import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest {
  userId: string;
  avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider,
  ) {}
  async execute({ userId, avatarFile }: IRequest): Promise<string> {
    let user = await this.usersRepository.findById(userId);

    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, "avatar");
    }

    await this.storageProvider.save(avatarFile, "avatar");

    user.avatar = avatarFile;

    await this.usersRepository.create(user);

    user = await this.usersRepository.findById(userId);
    return user.avatarUrl();
  }
}

export { UpdateUserAvatarUseCase };
