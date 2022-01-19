import { Router } from "express";

import { authenticateRoutes } from "./account/authenticate.routes";
import { passwordRoutes } from "./account/password.routes";
import { usersRoutes } from "./account/users.routes";
import { activityCategoriesRoutes } from "./activityRegulation/activityCategories.routes";
import { coursesRoutes } from "./activityRegulation/courses.routes";
import { institutionsRoutes } from "./activityRegulation/institutions.routes";
import { regulationsRoutes } from "./activityRegulation/regulations.routes";
import { citiesRoutes } from "./territory/cities.routes";
import { statesRoutes } from "./territory/states.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use(authenticateRoutes);
router.use("/password", passwordRoutes);
router.use("/states", statesRoutes);
router.use("/cities", citiesRoutes);
router.use("/institutions", institutionsRoutes);
router.use("/courses", coursesRoutes);
router.use("/regulations", regulationsRoutes);
router.use("/activity-categories", activityCategoriesRoutes);

export { router };
