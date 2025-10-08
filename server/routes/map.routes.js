import { Router } from 'express';
import { authUserMiddleware } from '../middlewares/auth.middleware.js';
import { getCoordinatesController, getDistanceTimeController, getSuggestionsAddressController} from '../controllers/map.controller.js';



const mapsRouter = Router();

// Define map-related routes here
mapsRouter.get('/get-coordinates',authUserMiddleware,getCoordinatesController);
mapsRouter.get('/get-distance-time',authUserMiddleware,getDistanceTimeController);
mapsRouter.get('/get-suggestions',authUserMiddleware,getSuggestionsAddressController);

export default mapsRouter;