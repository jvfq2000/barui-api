import { User } from "@modules/account/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { StudentActivity } from "@modules/studentActivity/infra/typeorm/entities/StudentActivity";
import { AppError } from "@shared/errors/AppError";

import { accessLevel } from "./permissions";

interface IValidateFindUserActivityParams {
  studentActivity: StudentActivity;
  usersRepository: IUsersRepository;
  currentUserId: string;
  userId: string;
}

async function validateFindUserActivity({
  studentActivity,
  usersRepository,
  currentUserId,
  userId,
}: IValidateFindUserActivityParams): Promise<void> {
  const currentUser = await usersRepository.findById(currentUserId);

  if (
    currentUser.accessLevel === accessLevel[0] &&
    currentUser.id !== studentActivity.userId
  ) {
    throw new AppError("Você não tem permissão para realizar esta ação!", 401);
  } else {
    if (currentUser.accessLevel === accessLevel[0]) {
      throw new AppError(
        "Você não tem permissão para realizar esta ação!",
        401,
      );
    }

    const user = await usersRepository.findById(userId);

    if (user.accessLevel !== accessLevel[0]) {
      throw new AppError(
        "Não é possível alterar atividades de um usuário, que não seja aluno.",
      );
    } else {
      if (
        (currentUser.accessLevel === accessLevel[1] ||
          currentUser.accessLevel === accessLevel[2]) &&
        currentUser.courseId !== user.courseId
      ) {
        throw new AppError(
          "Você não tem permissão para realizar esta ação!",
          401,
        );
      }

      if (
        currentUser.accessLevel === accessLevel[3] &&
        currentUser.institutionId !== user.institutionId
      ) {
        throw new AppError(
          "Você não tem permissão para realizar esta ação!",
          401,
        );
      }
    }
  }
}

export { validateFindUserActivity };
