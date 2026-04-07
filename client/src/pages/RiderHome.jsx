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

const RiderHome = () => {
  const [riderPopUpForUserReqPanel, setRiderPopUpForUserReqPanel] = useState(true);
  const [riderConfirmUserReqPanel, setRiderConfirmUserReqPanel] = useState(false);

  const { rider } = useContext(RiderContextData);
  //socket io context
  const {socket} = useContext(SocketIOContext);

  useEffect(() => {
    socket.emit('join',{
      userId: rider._id,
      userType: "rider"
    })

    const updateLocation = () => {
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
          socket.emit('rider-location-update',
            {
              userId: rider._id,
              location: {
                ltd: position.coords.latitude,
                lng: position.coords.longitude
               }
            }
          )
        })
      } 
    }

    const locationInterval = setInterval(updateLocation, 10000); // Update location every 10 seconds
    updateLocation();
    return () => clearInterval(locationInterval); // Clean up the interval on component unmount
  }, []);

  socket.on('new-journey-request', (data) => {
    console.log('New journey request received:', data);
    //setRiderPopUpForUserReqPanel(true);
  });

  //ref for rider pop up for user request panel
    const riderPopUpForUserReqPanelRef = useRef(null);
  //ref for rider confirm user request panel
    const riderConfirmUserReqPanelRef = useRef(null);

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
  
//onClick={() => setAllVehiclesInAreaPanel(false)}

  return (
    <div className='h-screen w-screen'>
        <div className='top-0 left-0 w-full flex justify-end px-5'>
          <Link to={'/rider-home'}
            className='fixed p-2 flex items-center justify-end ml-3 mt-3 text-sm bg-white text-black border-2 border-blue-700 rounded-full'
            ><IoIosLogOut />
          </Link>
        </div>
       <div className='h-[61%] w-full'>
          <img  className='h-full w-full object-cover' src="../src/assets/mapDemo.png" alt="map"/>
       </div>
    
       <div className='h-[39%] p-2'>
        <RiderDetails />
       </div>



       {/*Rider Popup for User Request*/}
        <div ref={riderPopUpForUserReqPanelRef} className='fixed z-10 w-full bg-white px-3 py-5 bottom-0 pt-4 translate-y-full'>
          <RiderPopUpForUserRequest setRiderPopUpForUserReqPanel={setRiderPopUpForUserReqPanel} setRiderConfirmUserReqPanel={setRiderConfirmUserReqPanel}/>
        </div>


        {/*Rider Popup for User Request*/}
        <div ref={riderConfirmUserReqPanelRef} className='fixed z-10 w-full h-screen bg-white px-3 py-5 bottom-0 pt-4 translate-y-full'>
          <RiderConfirmUserReq setRiderConfirmUserReqPanel={setRiderConfirmUserReqPanel}/>
        </div>



    </div>
  )
}

export default RiderHome
