import { createBrowserRouter } from "react-router-dom";
import StartingHome from "../pages/StartingHome";
import UserLogin from "../pages/UserLogin";
import RiderLogin from "../pages/RiderLogin";
import UserRegister from "../pages/UserRegister";
import RiderRegister from "../pages/RiderRegister";
import UserLogout from "../pages/UserLogout";
import UserHome from "../pages/UserHome";
import RiderHome from "../pages/RiderHome"; 
import App from "../App";
import UserURLProtectionLayer from "../utils/UserURLProtectioLayer";
import RiderLogout from "../pages/RiderLogout";
import RiderURLProtectionLayer from "../utils/RiderURLProtectionLayer";
import UserRidingIntoVehicle from "../pages/UserRidingIntoVehicle";


const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "/",
                element : <StartingHome/>,
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
            },
            {
                path: "/user-home",
                element : <UserURLProtectionLayer><UserHome/></UserURLProtectionLayer>
            },
            {
                path : "/user-logout",
                element : <UserURLProtectionLayer><UserLogout/></UserURLProtectionLayer>
            },
            {
                path: "/rider-home",
                element : <RiderURLProtectionLayer><RiderHome/></RiderURLProtectionLayer>
            },
            {
                path : "/rider-logout",
                element : <RiderURLProtectionLayer><RiderLogout/></RiderURLProtectionLayer>
            },
            {
                path: "/user-riding",
                element : <UserURLProtectionLayer><UserRidingIntoVehicle/></UserURLProtectionLayer>
            }
        ]
    }
])

export default router
