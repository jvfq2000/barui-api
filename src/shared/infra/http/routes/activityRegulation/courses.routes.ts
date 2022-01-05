import { Router } from "express";

import { CreateCourseController } from "@modules/activityRegulation/useCases/createCourse/CreateCourseController";
import { ListCoursesController } from "@modules/activityRegulation/useCases/listCourses/ListCoursesController";
import { ModifyIsActiveCourseController } from "@modules/activityRegulation/useCases/modifyIsActiveCourse/ModifyIsActiveCourseController";
import { UpdateCourseController } from "@modules/activityRegulation/useCases/updateCourses/UpdateCourseController";

import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";
import { ensureInstitutionAdmin } from "../../middlewares/ensureInstitutionAdmin";

const createCourseController = new CreateCourseController();
const listCoursesController = new ListCoursesController();
const updateCourseController = new UpdateCourseController();
const modifyIsActiveCourseController = new ModifyIsActiveCourseController();

const coursesRoutes = Router();

coursesRoutes.post(
  "/",
  ensureAuthenticated,
  ensureInstitutionAdmin,
  createCourseController.handle,
);

coursesRoutes.get(
  "/",
  ensureAuthenticated,
  ensureInstitutionAdmin,
  listCoursesController.handle,
);

coursesRoutes.put(
  "/",
  ensureAuthenticated,
  ensureInstitutionAdmin,
  updateCourseController.handle,
);

coursesRoutes.patch(
  "/is-active",
  ensureAuthenticated,
  ensureInstitutionAdmin,
  modifyIsActiveCourseController.handle,
);

export { coursesRoutes };
