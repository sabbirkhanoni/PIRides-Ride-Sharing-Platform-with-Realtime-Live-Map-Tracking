import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import Axios from '../utils/Axios';
import SummaryAPI from '../Common/SummaryAPI';
import AxiosToastError from '../utils/AxiosToastError';


const RiderLogout = () => {

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

    Axios({
        ...SummaryAPI.RiderLogoutAPI,
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if (response.data.success) {
            toast.success(response.data.message);
            localStorage.removeItem('token');
            navigate('/rider-login');
        } else {
            toast.error(response.data.message);
        }
    }).catch((error) => {
        AxiosToastError(error);
    });

  return (
    <div>
        Rider Logout Page
    </div>
  )
}

export default RiderLogout
