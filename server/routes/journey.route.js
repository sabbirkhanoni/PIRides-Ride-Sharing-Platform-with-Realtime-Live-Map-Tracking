import { Router } from "express";
import { authUserMiddleware } from "../middlewares/auth.middleware.js";
import  {journeyStartController} from "../controllers/journey.controller.js";


const journeyRouter = Router();
// Define journey-related routes here
journeyRouter.post('/start',authUserMiddleware,journeyStartController);

export default journeyRouter;