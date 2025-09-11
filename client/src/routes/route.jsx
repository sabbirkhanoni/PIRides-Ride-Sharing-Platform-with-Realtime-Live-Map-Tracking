import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import UserLogin from "../pages/UserLogin";
import RiderLogin from "../pages/RiderLogin";
import UserRegister from "../pages/UserRegister";
import RiderRegister from "../pages/RiderRegister";
import App from "../App";

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "/",
                element : <Home/>,
            },
            {
                path : "user-login",
                element : <UserLogin/>,
            },
            {
                path : "user-register",
                element : <UserRegister/>,
            },
            {
                path : "rider-register",
                element : <RiderRegister/>,
            },
            {
                path : "rider-login",
                element : <RiderLogin/>,
            }
        ]
    }
])

export default router
