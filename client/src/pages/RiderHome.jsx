import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { IoIosLogOut } from "react-icons/io";
import RiderDetails from '../Components/RiderDetails';
import RiderPopUpForUserRequest from '../Components/RiderPopUpForUserRequest';
import {useGSAP} from '@gsap/react'
import gsap from 'gsap';
import RiderConfirmUserReq from '../Components/RiderConfirmUserReq';

import { SocketIOContext } from '../Context/SocketIOContext';
import { RiderContextData } from '../Context/RiderContext';
import { useEffect , useContext } from 'react';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import SummaryAPI from '../Common/SummaryAPI';

const RiderHome = () => {
  const [riderPopUpForUserReqPanel, setRiderPopUpForUserReqPanel] = useState(false);
  const [riderConfirmUserReqPanel, setRiderConfirmUserReqPanel] = useState(false);

  const { rider } = useContext(RiderContextData);
  const {socket} = useContext(SocketIOContext);
  const [userDetails, setUserDetails] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);

  const riderPopUpForUserReqPanelRef = useRef(null);
  const riderConfirmUserReqPanelRef = useRef(null);
  
  useEffect(() => {
    if (!socket) {
      return;
    }

  
    const handleConnect = () => {
      setSocketConnected(true);
    };

    const handleDisconnect = () => {
      setSocketConnected(false);
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);

    if (socket.connected) {
      setSocketConnected(true);
    }

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
    };
  }, [socket]);

  useEffect(() => {
    if (!socket || !rider._id || !socketConnected) {
      return;
    }

    socket.emit('join', {
      userId: rider._id,
      userType: "rider"
    })

    const updateLocation = () => {
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            console.log('📍 Location updated - Lat:', latitude, 'Lng:', longitude);
            socket.emit('rider-location-update', {
              userId: rider._id,
              location: {
                ltd: latitude,
                lng: longitude
              }
            });
          },
          error => {
            console.error('Geolocation error:', error.message);
          }
        );
      } else {
        console.error('Geolocation not supported by browser');
      }
    };

    const locationInterval = setInterval(updateLocation, 10000); // Update location every 10 seconds
    updateLocation();
    return () => clearInterval(locationInterval);
  }, [rider._id, socket, socketConnected]);

  useEffect(() => {
    if (!socket) {
      return;
    }
    const handleNewJourney = (data) => {
      setUserDetails(data);
      setRiderPopUpForUserReqPanel(true);
    };

    const handleSocketError = (error) => {
      console.error('Socket error:', error);
    };

    const handleConnect = () => {
      console.log('Socket reconnected during listener setup');
    };

    // Register all listeners
    socket.on('new-journey-request', handleNewJourney);
    socket.on('error', handleSocketError);
    socket.on('connect', handleConnect);

    return () => {
      socket.off('new-journey-request', handleNewJourney);
      socket.off('error', handleSocketError);
      socket.off('connect', handleConnect);
    };
  }, [socket]);


  const confirmJourneyByRider = async () => {
     try {
        const response = await Axios({
        ...SummaryAPI.confrimJourneyByRider,
        data: {
          riderId: rider._id,
          journeyId: userDetails._id
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.data.success){
        toast.success(response.data.message);
      }
     } catch (error){
      AxiosToastError(error);
     }
  }

    

  {/* panel suggestion panel animation */}
  useGSAP(function(){
    if(riderPopUpForUserReqPanel){
      gsap.to(riderPopUpForUserReqPanelRef.current, {
            transform: 'translateY(0%)',
      })
    }else{
      gsap.to(riderPopUpForUserReqPanelRef.current, {
            transform: 'translateY(100%)'
            
      })  
    }
  }, [riderPopUpForUserReqPanel]);
  
  useGSAP(function(){
  if(riderConfirmUserReqPanel){
    gsap.to(riderConfirmUserReqPanelRef.current, {
          transform: 'translateY(0%)',
    })
  }else{
    gsap.to(riderConfirmUserReqPanelRef.current, {
          transform: 'translateY(100%)'
          
    })  
  }
}, [riderConfirmUserReqPanel]);
  
  return (
    <div className='h-screen w-screen'>
        <div className='top-0 left-0 w-full flex justify-end px-5'>
          <Link to={'/rider-home'}
            className='fixed p-2 flex items-center justify-end ml-3 mt-3 text-sm bg-white text-black border-2 border-blue-700 rounded-full'
            ><IoIosLogOut />
          </Link>
        </div>
       <div className='h-[61%] w-full'>
          <img  className='h-full w-full object-cover' src="/mapDemo.png" alt="map"/>
       </div>
    
       <div className='h-[39%] p-2'>
        <RiderDetails />
       </div>



       {/*Rider Popup for User Request*/}
        <div ref={riderPopUpForUserReqPanelRef} className='fixed z-10 w-full bg-white px-3 py-5 bottom-0 pt-4 translate-y-full'>
          <RiderPopUpForUserRequest
          setRiderPopUpForUserReqPanel={setRiderPopUpForUserReqPanel}
          setRiderConfirmUserReqPanel={setRiderConfirmUserReqPanel}
          userDetails={userDetails} 
          confirmJourneyByRider={confirmJourneyByRider}
          />
        </div>


        {/*Rider Popup for User Request*/}
        <div ref={riderConfirmUserReqPanelRef} className='fixed z-10 w-full h-screen bg-white px-3 py-5 bottom-0 pt-4 translate-y-full'>
          <RiderConfirmUserReq setRiderConfirmUserReqPanel={setRiderConfirmUserReqPanel}/>
        </div>



    </div>
  )
}

export default RiderHome
