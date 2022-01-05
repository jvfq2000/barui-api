import { NextFunction, Request, Response } from "express";

import { UsersRepository } from "@modules/account/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";
import { accessLevel } from "@utils/permitions";
import { validateUserAccessLevel } from "@utils/validateUserAccessLevel";

async function ensureActivitiesCoordinator(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { id } = request.user;
  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(id);

  const userHasValidAccessLevel = validateUserAccessLevel({
    userAccessLevel: user.accessLevel,
    requiredAccessLevel: accessLevel[1],
  });

  if (userHasValidAccessLevel) {
    throw new AppError("Você não tem permissão para realizar esta ação!", 401);
  }

  return next();
}

export { ensureActivitiesCoordinator };
