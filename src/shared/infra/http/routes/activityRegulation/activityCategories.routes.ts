import { Router } from "express";

import { CreateActivityCategoryController } from "@modules/activityRegulation/useCases/activityCategories/createActivityCategory/CreateActivityCategoryController";
import { FindActivityCategoryByIdController } from "@modules/activityRegulation/useCases/activityCategories/findActivityCategoryById/FindActivityCategoryByIdController";
import { ListActivityCategoriesController } from "@modules/activityRegulation/useCases/activityCategories/listActivityCategories/ListActivityCategoriesController";
import { ListActivityCategoriesByInstitutionIdController } from "@modules/activityRegulation/useCases/activityCategories/listActivityCategoriesByInstitutionId/ListActivityCategoriesByInstitutionIdController";
import { ModifyIsActiveActivityCategoryController } from "@modules/activityRegulation/useCases/activityCategories/modifyIsActiveActivityCategory/ModifyIsActiveActivityCategoryController";
import { UpdateActivityCategoryController } from "@modules/activityRegulation/useCases/activityCategories/updateActivityCategory/UpdateActivityCategoryController";

import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";
import { ensureInstitutionAdmin } from "../../middlewares/ensureInstitutionAdmin";

const createActivityCategoryController = new CreateActivityCategoryController();
const listActivityCategoriesController = new ListActivityCategoriesController();
const findActivityCategoryByIdController =
  new FindActivityCategoryByIdController();
const listActivityCategoriesByInstitutionIdController =
  new ListActivityCategoriesByInstitutionIdController();
const updateActivityCategoryController = new UpdateActivityCategoryController();
const modifyIsActiveActivityCategoryController =
  new ModifyIsActiveActivityCategoryController();

const activityCategoriesRoutes = Router();

activityCategoriesRoutes.post(
  "/",
  ensureAuthenticated,
  ensureInstitutionAdmin,
  createActivityCategoryController.handle,
);

activityCategoriesRoutes.get(
  "/",
  ensureAuthenticated,
  ensureInstitutionAdmin,
  listActivityCategoriesController.handle,
);

activityCategoriesRoutes.get(
  "/by-id",
  ensureAuthenticated,
  ensureInstitutionAdmin,
  findActivityCategoryByIdController.handle,
);

activityCategoriesRoutes.get(
  "/by-institution-id",
  ensureAuthenticated,
  ensureInstitutionAdmin,
  listActivityCategoriesByInstitutionIdController.handle,
);

activityCategoriesRoutes.put(
  "/",
  ensureAuthenticated,
  ensureInstitutionAdmin,
  updateActivityCategoryController.handle,
);

activityCategoriesRoutes.patch(
  "/is-active",
  ensureAuthenticated,
  ensureInstitutionAdmin,
  modifyIsActiveActivityCategoryController.handle,
);

export { activityCategoriesRoutes };
