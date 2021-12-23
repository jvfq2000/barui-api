import { NextFunction, Request, Response } from "express";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";
import { accessLevel } from "@utils/permitions";
import { validateUserAccessLevel } from "@utils/validateUserAccessLevel";

export async function ensureRepresentative(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { id } = request.user;
  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(id);

  const userHasValidAccessLevel = validateUserAccessLevel({
    userAccessLevel: user.accessLevel,
    requiredAccessLevel: accessLevel[2],
  });

  if (userHasValidAccessLevel) {
    throw new AppError("Usuário não tem permissão!", 401);
  }

  return next();
}
