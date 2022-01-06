import { Router } from "express";

import { CreateCourseController } from "@modules/activityRegulation/useCases/courses/createCourse/CreateCourseController";
import { FindCourseByIdController } from "@modules/activityRegulation/useCases/courses/findCourseById/FindCourseByIdController";
import { ListCoursesController } from "@modules/activityRegulation/useCases/courses/listCourses/ListCoursesController";
import { ModifyIsActiveCourseController } from "@modules/activityRegulation/useCases/courses/modifyIsActiveCourse/ModifyIsActiveCourseController";
import { UpdateCourseController } from "@modules/activityRegulation/useCases/courses/updateCourses/UpdateCourseController";

import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";
import { ensureInstitutionAdmin } from "../../middlewares/ensureInstitutionAdmin";

const createCourseController = new CreateCourseController();
const listCoursesController = new ListCoursesController();
const updateCourseController = new UpdateCourseController();
const modifyIsActiveCourseController = new ModifyIsActiveCourseController();
const findCourseByIdController = new FindCourseByIdController();

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

coursesRoutes.get(
  "/by-id",
  ensureAuthenticated,
  ensureInstitutionAdmin,
  findCourseByIdController.handle,
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
