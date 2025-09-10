import { Router } from "express";
import { riderRegisterController } from "../controllers/rider.controller.js";

const riderRouter = Router();

// Define rider routes here

riderRouter.post('/register', riderRegisterController);







export default riderRouter;