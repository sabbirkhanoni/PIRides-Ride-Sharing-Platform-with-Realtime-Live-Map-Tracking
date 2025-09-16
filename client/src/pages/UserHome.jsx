import React, { use, useRef, useState } from 'react'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap';
import { RiArrowDownWideFill,RiArrowUpWideFill  } from "react-icons/ri";
import LocationSuggestionPanel from '../Components/LocationSuggestionPanel';
import VehiclesInThatArea from '../Components/VehiclesInThatArea';
import UserLookingForaRiderToVehicleFoundAndWaitingRiderToAcceptRequest from '../Components/UserLookingForaRiderToVehicleFoundAndWaitingRiderToAcceptRequest';
import UserGotRiderNowWaitingForRiderPickUp from '../Components/UserGotRiderNowWaitingForRiderPickUp';
import UserRideConfirmationDetailsOfVehicles from '../Components/UserRideConfirmationDetailsOfVehicles';

const UserHome = () => {

  const [pickupDestinationData, setPickupDestinationData] = React.useState({
    pickup: "",
    destination: "",
  })

  const [locationPanelOpen, setLocationPanelOpen] = useState(false);
  const [allVehiclesInAreaPanel, setAllVehiclesInAreaPanel] = useState(false);
  const [confirmDetailsOfVehiclesPanel, setConfirmDetailsOfVehiclesPanel] = useState(false);
  const [userLookingForaRiderVehicleFound, setUserLookingForaRiderVehicleFound] = useState(false);
  const [userGotRiderNowWaitingForRiderPickUp, setUserGotRiderNowWaitingForRiderPickUp] = useState(true);

  const panelRef = useRef(null);
  const allVehiclesInAreaPanelRef = useRef(null);
  const confirmDetailsOfVehiclesPanelRef = useRef(null);
  const userLookingForaRiderVehicleFoundRef = useRef(null);
  const userWaitingForRiderAcceptanceRef = useRef(null);

  {/* location suggestion panel animation */}
  useGSAP(function(){
    if(locationPanelOpen){
      gsap.to(panelRef.current, {
            height: '70%',
            padding: 25,
            duration: 0.9, ease: 'power3.out',
            
      })
    }else{
      gsap.to(panelRef.current, {
            height: '0%',
            padding: 0,
            paddingLeft:0,
            duration: 0.9, ease: 'power3.out',
            
      })  
    }
  }, [locationPanelOpen]);

  {/* all details of vehicles panel */}
  useGSAP(function(){
      if(allVehiclesInAreaPanel){
        gsap.to(allVehiclesInAreaPanelRef.current, {
            transform: 'translateY(0%)',
            duration: 0.6, ease: 'power3.out',
            delay: 0.3
      })}else{
        gsap.to(allVehiclesInAreaPanelRef.current, {
            transform: 'translateY(100%)',
            duration: 0.6, ease: 'power3.out',
            delay: 0.3
        })
      }
  }, [allVehiclesInAreaPanel]);

  {/* Confirmation Details of Vehicles */}
  useGSAP(function(){
      if(confirmDetailsOfVehiclesPanel){
        gsap.to(confirmDetailsOfVehiclesPanelRef.current, {
            transform: 'translateY(0%)',
            duration: 0.6, ease: 'power3.out',
            delay: 0.3
      })}else{
        gsap.to(confirmDetailsOfVehiclesPanelRef.current, {
            transform: 'translateY(100%)',
            duration: 0.6, ease: 'power3.out',
            delay: 0.3
        })
      }
  }, [confirmDetailsOfVehiclesPanel]);


  {/*User Looking for Rider Vehicle Found*/}
  useGSAP(function(){
      if(userLookingForaRiderVehicleFound){
        gsap.to(userLookingForaRiderVehicleFoundRef.current, {
            transform: 'translateY(0%)',
            duration: 0.6, ease: 'power3.out',
            delay: 0.6 
      })}else{
        gsap.to(userLookingForaRiderVehicleFoundRef.current, {
            transform: 'translateY(100%)',
            duration: 0.6, ease: 'power3.out',
            delay: 0.6
        })
      }
  }, [userLookingForaRiderVehicleFound]);


  {/*User Looking for Rider Vehicle Found*/}
  useGSAP(function(){
      if(userGotRiderNowWaitingForRiderPickUp){
        gsap.to(userWaitingForRiderAcceptanceRef.current, {
            transform: 'translateY(0%)',
            duration: 0.6, ease: 'power3.out',
            delay: 0.6 
      })}else{
        gsap.to(userWaitingForRiderAcceptanceRef.current, {
            transform: 'translateY(100%)',
            duration: 0.6, ease: 'power3.out',
            delay: 0.6
        })
      }
  }, [userGotRiderNowWaitingForRiderPickUp]);


  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setPickupDestinationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }; 

  const handleOnSubmit = (e) => {
    e.preventDefault();
  }


  return (
    <div className='relative h-screen overflow-hidden'>
       <img className='w-15 absolute left-5 top-5' src="../src/assets/pirides.png" alt="logo"/>

       <div className='h-screen w-screen'>
          <img onClick={() => setAllVehiclesInAreaPanel(false)} className='h-full w-full object-cover' src="../src/assets/mapDemo.png" alt="map"/>
       </div>

          
        <div className='absolute flex flex-col justify-end h-screen top-0 w-full'>
          {/* Fields */}
          <div className='h-[30%] p-5 bg-white relative'>
            <h3 className='text-xl font-bold'>Find your Ride</h3>
            <form onSubmit={handleOnSubmit}>
                <div className='line bg-blue-500 absolute h-27 w-1 top-[25%] md:top-[25%] lg:top-[25%] left-5 rounded-full'></div>
                <input
                className='border border-gray-300 bg-blue-50 text-lg text-black p-2 px-3 rounded-md w-full mb-4 mt-2'
                name="pickup"
                value={pickupDestinationData.pickup}
                onChange={handleOnChange}
                onClick={() => setLocationPanelOpen(true)}
                type="text"
                placeholder='Enter pickup location' />
                <input
                className='border border-gray-300 bg-blue-50 text-lg text-black p-2 px-3 rounded-md w-full'
                name="destination"
                value={pickupDestinationData.destination}
                onChange={handleOnChange}
                onClick={() => setLocationPanelOpen(true)}
                type="text"
                placeholder='Enter drop location' />
                <h2 className='absolute top-[88%] left-1/2 transform -translate-x-1/2 text-xl'
                onClick={() => setLocationPanelOpen(!locationPanelOpen)}
                >
                 {locationPanelOpen ? <RiArrowDownWideFill /> : <RiArrowUpWideFill/>}
                </h2>
            </form>
          </div>

          {/* Suggestions */}
          <div ref={panelRef} className='h-[0] bg-white '>
              <LocationSuggestionPanel setLocationPanelOpen={setLocationPanelOpen} setAllVehiclesInAreaPanel={setAllVehiclesInAreaPanel} />
          </div>
        </div>

        {/*Ride Suggestions*/}
        <div ref={allVehiclesInAreaPanelRef} className='fixed z-10 w-full bg-white px-3 py-5 bottom-0 translate-y-full'>
          {/* vehicle in that area component */}
          <VehiclesInThatArea setConfirmDetailsOfVehiclesPanel={setConfirmDetailsOfVehiclesPanel} setAllVehiclesInAreaPanel={setAllVehiclesInAreaPanel}/>
        </div>


        {/*Confirm Details Of Rides*/}
        <div ref={confirmDetailsOfVehiclesPanelRef} className='fixed z-10 w-full bg-white px-3 py-5 bottom-0 translate-y-full pt-4'>
          {/* vehicle in that area component */}
          <UserRideConfirmationDetailsOfVehicles setConfirmDetailsOfVehiclesPanel={setConfirmDetailsOfVehiclesPanel} setUserLookingForaRiderVehicleFound={setUserLookingForaRiderVehicleFound} />
        </div>


        {/*Looking for Rider*/}
        <div ref={userLookingForaRiderVehicleFoundRef} className='fixed z-10 w-full bg-white px-3 py-5 bottom-0 translate-y-full pt-4'>
          {/* vehicle in that area component */}
          <UserLookingForaRiderToVehicleFoundAndWaitingRiderToAcceptRequest setUserLookingForaRiderVehicleFound={setUserLookingForaRiderVehicleFound} />
        </div>


        {/*Waiting for Rider*/}
        <div ref={userWaitingForRiderAcceptanceRef} className='fixed z-10 w-full bg-white px-3 py-5 bottom-0 translate-y-full pt-4'>
          {/* vehicle in that area component */}
          <UserGotRiderNowWaitingForRiderPickUp setUserGotRiderNowWaitingForRiderPickUp={setUserGotRiderNowWaitingForRiderPickUp} />
        </div>


    </div>
  )
}

export default UserHome
