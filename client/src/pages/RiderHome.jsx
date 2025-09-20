import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { IoIosLogOut } from "react-icons/io";
import RiderDetails from '../Components/RiderDetails';
import RiderPopUpForUserRequest from '../Components/RiderPopUpForUserRequest';
import {useGSAP} from '@gsap/react'
import gsap from 'gsap';
import RiderConfirmUserReq from '../Components/RiderConfirmUserReq';

const RiderHome = () => {
  const [riderPopUpForUserReqPanel, setRiderPopUpForUserReqPanel] = useState(true);
  const [riderConfirmUserReqPanel, setRiderConfirmUserReqPanel] = useState(false);


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
  

  return (
    <div className='h-screen w-screen'>
        <div className='top-0 left-0 w-full flex justify-end px-5'>
          <Link to={'/rider-home'}
            className='fixed p-2 flex items-center justify-end ml-3 mt-3 text-sm bg-white text-black border-2 border-blue-700 rounded-full'
            ><IoIosLogOut />
          </Link>
        </div>
       <div className='h-[61%] w-full'>
          <img onClick={() => setAllVehiclesInAreaPanel(false)} className='h-full w-full object-cover' src="../src/assets/mapDemo.png" alt="map"/>
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
