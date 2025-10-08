import React, {useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from '../utils/Axios';
import SummaryAPI from '../Common/SummaryAPI';
import { RiderContextData } from '../Context/RiderContext';
import { TrophySpin } from 'react-loading-indicators';
import AxiosToastError from './AxiosToastError';

const RiderURLProtectionLayer = ({children}) => {


const token = localStorage.getItem('token');

const [loading, setLoading] = useState(true);

//context
const { rider, setRider } = useContext(RiderContextData);

const navigate = useNavigate();

useEffect(() => {
      if (!token) {
      navigate('/rider-login');
      }
  }, [token]);

  Axios({
    ...SummaryAPI.RiderProfileAPI,
    headers: {
        Authorization: `Bearer ${token}`
    }
  }).then((response) => {
    if(response.data.success === true){
        setRider(response.data.rider);
        setLoading(false);
    }
    }).catch((error) => {
        localStorage.removeItem('token');
        AxiosToastError(error);
        navigate('/rider-login');
    });

    if(loading){
        return <div className='flex h-screen justify-center items-center'><TrophySpin color="#2972da" size="large" text="" textColor="" /></div>
    }

    return (
        <div>
        {children}
        </div>
    )
}

export default RiderURLProtectionLayer
