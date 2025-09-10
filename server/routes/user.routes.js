import { Router } from 'express'
import { userRegisterController, userLoginController } from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.post('/register',userRegisterController)
userRouter.post('/login',userLoginController)

export default userRouter;