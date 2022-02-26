import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateStudentActivityController } from "@modules/studentActivity/useCases/createStudentActivity/CreateStudentActivityController";
import { FindStudentActivityByIdController } from "@modules/studentActivity/useCases/findStudentActivityById/FindStudentActivityByIdController";
import { ListStudentActivitiesController } from "@modules/studentActivity/useCases/listStudentActivities/ListStudentActivitiesController";
import { ListStudentsController } from "@modules/studentActivity/useCases/listStudents/ListStudentsController";
import { ModifyIsActiveStudentActivityController } from "@modules/studentActivity/useCases/modifyIsActiveStudentActivity/ModifyIsActiveStudentActivityController";
import { UpdateStudentActivityController } from "@modules/studentActivity/useCases/updateStudentActivity/UpdateStudentActivityController";

import { ensureActivitiesCoordinator } from "../../middlewares/ensureActivitiesCoordinator";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";

const createStudentActivityController = new CreateStudentActivityController();
const findStudentActivityByIdController =
  new FindStudentActivityByIdController();
const listStudentActivitiesController = new ListStudentActivitiesController();
const updateStudentActivityController = new UpdateStudentActivityController();
const modifyIsActiveStudentActivityController =
  new ModifyIsActiveStudentActivityController();
const listStudentsController = new ListStudentsController();

const uploadStudentActivity = multer(uploadConfig);

const studentActivitiesRoutes = Router();

studentActivitiesRoutes.post(
  "/",
  ensureAuthenticated,
  uploadStudentActivity.single("file"),
  createStudentActivityController.handle,
);

studentActivitiesRoutes.get(
  "/",
  ensureAuthenticated,
  listStudentActivitiesController.handle,
);

studentActivitiesRoutes.get(
  "/by-id",
  ensureAuthenticated,
  findStudentActivityByIdController.handle,
);

studentActivitiesRoutes.get(
  "/students",
  ensureAuthenticated,
  ensureActivitiesCoordinator,
  listStudentsController.handle,
);

studentActivitiesRoutes.put(
  "/",
  ensureAuthenticated,
  uploadStudentActivity.single("file"),
  updateStudentActivityController.handle,
);

studentActivitiesRoutes.patch(
  "/is-active",
  ensureAuthenticated,
  modifyIsActiveStudentActivityController.handle,
);

export { studentActivitiesRoutes };
