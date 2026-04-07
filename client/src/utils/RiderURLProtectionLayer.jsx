import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from './Axios.js';
import SummaryAPI from '../Common/SummaryAPI.js';
import { RiderContextData } from '../Context/RiderContext.jsx';
import AxiosToastError from './AxiosToastError.js';

const RiderURLProtectionLayer = ({children}) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setRider } = useContext(RiderContextData);

  useEffect(() => {
    const fetchRiderProfile = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/rider-login');
        return;
      }

      try {
        const response = await Axios({
          ...SummaryAPI.RiderProfileAPI,
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.success === true) {
          setRider(response.data.data); // Set rider data once
          setLoading(false);
        }
      } catch (error) {
        localStorage.removeItem('token');
        AxiosToastError(error);
        navigate('/rider-login');
      }
    };

    fetchRiderProfile();
  }, []); // Empty dependency array - runs only ONCE on mount

  if (loading) {
    return <div className='flex items-center justify-center h-screen'>Loading...</div>;
  }

  return children;
};

export default RiderURLProtectionLayer;