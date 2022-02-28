import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/account/useCases/createUser/CreateUserController";
import { FindUserByIdController } from "@modules/account/useCases/findUserById/FindUserByIdController";
import { ListUsersController } from "@modules/account/useCases/listUsers/ListUsersController";
import { ModifyIsActiveUserController } from "@modules/account/useCases/modifyIsActiveUser/ModifyIsActiveUserController";
import { ProfileUserController } from "@modules/account/useCases/profileUser/ProfileUserController";
import { UpdateProfileUserController } from "@modules/account/useCases/updateProfileUser/UpdateProfileUserController";
import { UpdateUserController } from "@modules/account/useCases/updateUser/UpdateUserController";
import { UpdateUserAccessLevelController } from "@modules/account/useCases/updateUserAccessLevel/UpdateUserAccessLevelController";
import { UpdateUserAvatarController } from "@modules/account/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { ensureInstitutionAdmin } from "../../middlewares/ensureInstitutionAdmin";

const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const findUserByIdController = new FindUserByIdController();
const listUsersController = new ListUsersController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();
const updateProfileUserController = new UpdateProfileUserController();
const updateUserAccessLevelController = new UpdateUserAccessLevelController();
const modifyIsActiveUserController = new ModifyIsActiveUserController();

const uploadAvatar = multer(uploadConfig);

const usersRoutes = Router();

usersRoutes.post(
  "/",
  ensureAuthenticated,
  ensureInstitutionAdmin,
  createUserController.handle,
);

usersRoutes.put(
  "/",
  ensureAuthenticated,
  ensureInstitutionAdmin,
  updateUserController.handle,
);

usersRoutes.get("/by-id", ensureAuthenticated, findUserByIdController.handle);

usersRoutes.get(
  "/",
  ensureAuthenticated,
  ensureInstitutionAdmin,
  listUsersController.handle,
);

usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle,
);

usersRoutes.get("/profile", ensureAuthenticated, profileUserController.handle);

usersRoutes.put(
  "/profile",
  ensureAuthenticated,
  updateProfileUserController.handle,
);

usersRoutes.patch(
  "/access-level",
  ensureAuthenticated,
  ensureInstitutionAdmin,
  updateUserAccessLevelController.handle,
);

usersRoutes.patch(
  "/is-active",
  ensureAuthenticated,
  ensureInstitutionAdmin,
  modifyIsActiveUserController.handle,
);

export { usersRoutes };
