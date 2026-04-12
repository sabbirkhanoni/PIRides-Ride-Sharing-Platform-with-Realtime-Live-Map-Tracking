import { Router } from "express";
import { authRiderMiddleware, authUserMiddleware } from "../middlewares/auth.middleware.js";
import  {journeyStartController,getJourneyDetailsController, confirmJourneyByRiderController} from "../controllers/journey.controller.js";


const journeyRouter = Router();
// Define journey-related routes here
journeyRouter.post('/start',authUserMiddleware,journeyStartController);
journeyRouter.get('/get-ride-details',authUserMiddleware,getJourneyDetailsController);
journeyRouter.post('/confirm-by-rider',authRiderMiddleware,confirmJourneyByRiderController);

export default journeyRouter;