import React from 'react'
import { useNavigate } from 'react-router-dom';
import  toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryAPI from '../Common/SummaryAPI';
import AxiosToastError from '../utils/AxiosToastError';


const UserLogout = () => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    Axios({
        ...SummaryAPI.UserLogoutAPI,
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        toast.success("Logout successful");
        localStorage.removeItem("token");
        navigate("/user-login");
    }).catch((error) => {
        AxiosToastError(error);
    });

  return (
    <div>
      user logout
    </div>
  )
}

export default UserLogout
