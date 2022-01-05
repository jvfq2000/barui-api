import { Router } from "express";

import { CreateCourseController } from "@modules/activityRegulation/useCases/createCourse/CreateCourseController";

import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";
import { ensureInstitutionAdmin } from "../../middlewares/ensureInstitutionAdmin";

const createCourseController = new CreateCourseController();

const coursesRoutes = Router();

coursesRoutes.post(
  "/",
  ensureAuthenticated,
  ensureInstitutionAdmin,
  createCourseController.handle,
);

export { coursesRoutes };
