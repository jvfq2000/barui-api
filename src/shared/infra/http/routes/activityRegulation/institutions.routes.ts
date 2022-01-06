import { Router } from "express";

import { CreateInstitutionController } from "@modules/activityRegulation/useCases/institutions/createInstitution/CreateInstitutionController";
import { FindInstitutionByIdController } from "@modules/activityRegulation/useCases/institutions/findInstitutionById/FindInstitutionByIdController";
import { ListInstitutionsController } from "@modules/activityRegulation/useCases/institutions/listInstitutions/ListInstitutionsController";
import { ModifyIsActiveInstitutionController } from "@modules/activityRegulation/useCases/institutions/modifyIsActiveInstitution/ModifyIsActiveInstitutionController";
import { UpdateInstitutionController } from "@modules/activityRegulation/useCases/institutions/updateInstitution/UpdateInstitutionController";

import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";
import { ensureGeneralAdmin } from "../../middlewares/ensureGeneralAdmin";

const createInstitutionController = new CreateInstitutionController();
const listInstitutionsController = new ListInstitutionsController();
const updateInstitutionController = new UpdateInstitutionController();
const modifyIsActiveInstitutionController =
  new ModifyIsActiveInstitutionController();
const findInstitutionByIdController = new FindInstitutionByIdController();

const institutionsRoutes = Router();

institutionsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureGeneralAdmin,
  createInstitutionController.handle,
);

institutionsRoutes.get(
  "/",
  ensureAuthenticated,
  ensureGeneralAdmin,
  listInstitutionsController.handle,
);

institutionsRoutes.get(
  "/by-id",
  ensureAuthenticated,
  ensureGeneralAdmin,
  findInstitutionByIdController.handle,
);

institutionsRoutes.put(
  "/",
  ensureAuthenticated,
  ensureGeneralAdmin,
  updateInstitutionController.handle,
);

institutionsRoutes.patch(
  "/is-active",
  ensureAuthenticated,
  ensureGeneralAdmin,
  modifyIsActiveInstitutionController.handle,
);

export { institutionsRoutes };
