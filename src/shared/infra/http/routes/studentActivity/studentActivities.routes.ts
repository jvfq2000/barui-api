import { Router } from "express";

import { CreateStudentActivityController } from "@modules/studentActivity/useCases/createStudentActivity/CreateStudentActivityController";

import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";

const createStudentActivityController = new CreateStudentActivityController();

const studentActivitiesRoutes = Router();

studentActivitiesRoutes.post(
  "/",
  ensureAuthenticated,
  createStudentActivityController.handle,
);

export { studentActivitiesRoutes };
