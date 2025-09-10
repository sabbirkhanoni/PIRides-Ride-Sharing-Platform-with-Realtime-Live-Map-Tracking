import { Router } from 'express'
import { authUserMiddleware } from '../middlewares/auth.middleware.js';
import { userRegisterController, userLoginController,userProfileController,userLogoutController } from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.post('/register',userRegisterController)
userRouter.post('/login',userLoginController)
userRouter.get('/profile',authUserMiddleware,userProfileController)
userRouter.get('/logout', authUserMiddleware, userLogoutController)



export default userRouter;