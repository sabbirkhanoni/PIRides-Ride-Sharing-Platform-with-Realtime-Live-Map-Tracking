import React, {useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from '../utils/Axios';
import SummaryAPI from '../Common/SummaryAPI';
import { UserContextData } from '../Context/UserContext';
import { TrophySpin } from 'react-loading-indicators';
import AxiosToastError from './AxiosToastError';

const UserURLProtectionLayer = ({children}) => {
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  //context
  const { user, setUser } = useContext(UserContextData);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/user-login');
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await Axios({
          ...SummaryAPI.UserProfileAPI,
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if(response.data.success === true){
          setUser(response.data.data);
          setLoading(false);
        }
      } catch (error) {
        localStorage.removeItem('token');
        AxiosToastError(error);
        navigate('/user-login');
      }
    };

    fetchUserProfile();
  }, [token]); 


  if(loading){
      return <div className='flex h-screen justify-center items-center'><TrophySpin color="#2972da" size="large" text="" textColor="" /></div>
  }

  return (
    <>
      {children}
    </>
  )
}

export default UserURLProtectionLayer
