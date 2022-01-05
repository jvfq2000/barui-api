import { Router } from "express";

import { CreateInstitutionController } from "@modules/activityRegulation/useCases/createInstitution/CreateInstitutionController";
import { ListInstitutionsController } from "@modules/activityRegulation/useCases/listInstitutions/ListInstitutionsController";
import { ModifyIsActiveInstitutionController } from "@modules/activityRegulation/useCases/modifyIsActiveInstitution/ModifyIsActiveInstitutionController";
import { UpdateInstitutionController } from "@modules/activityRegulation/useCases/updateInstitution/UpdateInstitutionController";

import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";
import { ensureGeneralAdmin } from "../../middlewares/ensureGeneralAdmin";

const createInstitutionController = new CreateInstitutionController();
const listInstitutionsController = new ListInstitutionsController();
const updateInstitutionController = new UpdateInstitutionController();
const modifyIsActiveInstitutionController =
  new ModifyIsActiveInstitutionController();

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
