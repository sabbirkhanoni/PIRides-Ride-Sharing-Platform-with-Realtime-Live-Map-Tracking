import { Router } from "express";

import { authRiderMiddleware } from "../middlewares/auth.middleware.js";
import { riderRegisterController,riderLoginController, riderProfileController, riderLogoutController } from "../controllers/rider.controller.js";

const riderRouter = Router();

// Define rider routes here
riderRouter.post('/register', riderRegisterController);
riderRouter.post('/login', riderLoginController);
riderRouter.get('/profile', authRiderMiddleware,riderProfileController);
riderRouter.get('/logout', authRiderMiddleware,riderLogoutController);

export default riderRouter;