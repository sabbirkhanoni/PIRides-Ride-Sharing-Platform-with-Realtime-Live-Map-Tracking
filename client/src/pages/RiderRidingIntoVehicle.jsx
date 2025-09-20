import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef, useState } from 'react'
import { RiArrowDownWideFill, RiArrowUpWideFill } from "react-icons/ri";
import RiderFinishRide from '../Components/RiderFinishRide';

const RiderRidingIntoVehicle = () => {
const [openRiderFinishRidePanel,setOpenRiderFinishRidePanel] = useState(false)


//ref
const riderFinishRidePanelRef = useRef(null);

//animation
  useGSAP(function(){
  if(openRiderFinishRidePanel){
    gsap.to(riderFinishRidePanelRef.current, {
          transform: 'translateY(0%)',
    })
  }else{
    gsap.to(riderFinishRidePanelRef.current, {
          transform: 'translateY(100%)'
          
    })  
  }
}, [openRiderFinishRidePanel]);
  
  




  return (
    <div className='h-screen w-screen'>
       <div className='h-[85%] w-full'>
          <img onClick={() => setOpenRiderFinishRidePanel(false)} className='h-full w-full object-cover' src="../src/assets/mapDemo.png" alt="map"/>
       </div>


       <div className='h-[15%]'>
            <h4
                onClick={() => setOpenRiderFinishRidePanel(true)}
                className='justify-center flex pt-2 items-center font-semibold text-lg text-center pb-2'><RiArrowUpWideFill />
            </h4>
            <div className='flex items-center gap-2 mx-4 mt-2 justify-between'>
                <h2 className='font-semibold'>1 Km Away</h2>
                <button
                    onClick={() => (setOpenRiderFinishRidePanel(true))}
                    className='px-7 bg-blue-500 text-white font-semibold py-2 rounded-full'
                    >Complete Ride
                </button>
            </div>
        </div>



        {/*Rider Popup for Rider Finish Ride*/}
        <div ref={riderFinishRidePanelRef} className='fixed z-10 w-full bg-white px-3 py-5 bottom-0 pt-4 translate-y-full'>
            <RiderFinishRide setRiderFinishRidePanel={setOpenRiderFinishRidePanel} />
        </div>

    </div>
  )
}

export default RiderRidingIntoVehicle
