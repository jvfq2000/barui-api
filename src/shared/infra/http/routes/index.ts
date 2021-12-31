import { Router } from "express";

import { authenticateRoutes } from "./account/authenticate.routes";
import { passwordRoutes } from "./account/password.routes";
import { usersRoutes } from "./account/users.routes";
import { citiesRoutes } from "./territory/cities.routes";
import { statesRoutes } from "./territory/states.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use(authenticateRoutes);
router.use("/password", passwordRoutes);
router.use("/states", statesRoutes);
router.use("/cities", citiesRoutes);

export { router };
