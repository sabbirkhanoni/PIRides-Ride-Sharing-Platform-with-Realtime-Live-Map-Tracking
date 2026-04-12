import React, { useRef, useState } from 'react'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap';
import { RiArrowDownWideFill,RiArrowUpWideFill  } from "react-icons/ri";
import LocationSuggestionPanel from '../Components/LocationSuggestionPanel';
import VehiclesInThatArea from '../Components/VehiclesInThatArea';
import UserLookingForaRiderToVehicleFoundAndWaitingRiderToAcceptRequest from '../Components/UserLookingForaRiderToVehicleFoundAndWaitingRiderToAcceptRequest';
import UserGotRiderNowWaitingForRiderPickUp from '../Components/UserGotRiderNowWaitingForRiderPickUp';
import UserRideConfirmationDetailsOfVehicles from '../Components/UserRideConfirmationDetailsOfVehicles';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummaryAPI from '../Common/SummaryAPI';
import { SocketIOContext } from '../Context/SocketIOContext';
import { useContext } from 'react';
import {UserContextData} from '../Context/UserContext';
import { useEffect } from 'react';


const UserHome = () => {

  const { socket } = useContext(SocketIOContext);
  const { user } = useContext(UserContextData);

  useEffect(() => {
    socket.emit("join", 
      {
        userType: "user",
        userId: user._id
      });
  }, [user]);

  const [pickupDestinationData, setPickupDestinationData] = useState({
    origin: "",
    destination: "",
  })

  const [locationPanelOpen, setLocationPanelOpen] = useState(false);
  const [allVehiclesInAreaPanel, setAllVehiclesInAreaPanel] = useState(false);
  const [confirmDetailsOfVehiclesPanel, setConfirmDetailsOfVehiclesPanel] = useState(false);
  const [userLookingForaRiderVehicleFound, setUserLookingForaRiderVehicleFound] = useState(false);
  const [userGotRiderNowWaitingForRiderPickUp, setUserGotRiderNowWaitingForRiderPickUp] = useState(false);
  const [selectVehicleType, setSelectVehicleType] = useState(null);


  const [ pickupSuggestions, setPickupSuggestions ] = useState([])
  const [ destinationSuggestions, setDestinationSuggestions ] = useState([])
  const [ activeField, setActiveField ] = useState(null)
  const [journeyDetails, setJourneyDetails] = useState({})

  const panelRef = useRef(null);
  const allVehiclesInAreaPanelRef = useRef(null);
  const confirmDetailsOfVehiclesPanelRef = useRef(null);
  const userLookingForaRiderVehicleFoundRef = useRef(null);
  const userWaitingForRiderAcceptanceRef = useRef(null);

  

  {/* location suggestion panel animation */}
  useGSAP(function(){
    if(locationPanelOpen){
      gsap.to(panelRef.current, {
            height: '60%',
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


  socket.on('journey-confirmed', journey => {
    setUserGotRiderNowWaitingForRiderPickUp(true);
  })

  const handlePickupChange = async (e) => {
      setPickupDestinationData({ ...pickupDestinationData, origin: e.target.value })
      
      if (e.target.value.length > 2) { // Only search after 3 characters
          try {
              const response = await Axios({
                  ...SummaryAPI.GetAddressSuggestionsAPI,
                  params: { input: e.target.value },
                  headers: {
                      Authorization: `Bearer ${localStorage.getItem('token')}`
                  }
              })
              console.log('Pickup suggestions response:', response.data);
              // Extract the data array from the API response
              setPickupSuggestions(response.data.data || [])
          } catch (error) {
              console.log(error)
              AxiosToastError(error)
          }
      } else {
          setPickupSuggestions([])
      }
  }


  const handleDestinationChange = async (e) => {
      setPickupDestinationData({ ...pickupDestinationData, destination: e.target.value })
      
      if (e.target.value.length > 2) { // Only search after 3 characters
          try {
              const response = await Axios({
                  ...SummaryAPI.GetAddressSuggestionsAPI,
                  params: { input: e.target.value },
                  headers: {
                      Authorization: `Bearer ${localStorage.getItem('token')}`
                  }
              })
              console.log('Destination suggestions response:', response.data);
              // Extract the data array from the API response
              setDestinationSuggestions(response.data.data || [])
          } catch (error) {
              console.log(error)
              AxiosToastError(error)
          }
      } else {
          setDestinationSuggestions([])
      }
  }


  const handleOnSubmit = (e) => {
    e.preventDefault();
  }

  async function findTripNow(){
    setAllVehiclesInAreaPanel(true);
    setLocationPanelOpen(false);

    const response = await Axios({
      ...SummaryAPI.GetJourneyDetailsAPI,
      params: {
        origin: pickupDestinationData.origin,
        destination: pickupDestinationData.destination
      },
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.success) {
      setJourneyDetails(response.data.data);
    } else {
      console.error(response.data.message);
    }
  }

async function startJourneyNow(){
    try {
        const response = await Axios({
            ...SummaryAPI.startJourneyNowAPI,
            data: {
                origin: pickupDestinationData.origin,
                destination: pickupDestinationData.destination,
                vehicleType: selectVehicleType  // Make sure this matches backend expectations
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        console.log('Journey started:', response.data);
        // Handle successful response here
        
    } catch (error) {
        console.error('Error starting journey:', error);
        AxiosToastError(error);
    }
}

  return (
    <div className='relative h-screen overflow-hidden'>
       <img className='w-15 absolute left-5 top-5' src="/pirides.png" alt="logo"/>

       <div className='h-screen w-screen'>
          <img onClick={() => setAllVehiclesInAreaPanel(false)} className='h-full w-full object-cover' src="/mapDemo.png" alt="map"/>
       </div>

          
        <div className='absolute flex flex-col justify-end h-screen top-0 w-full'>
          {/* Fields */}
          <div className='h-[40%] p-5 bg-blue-50 relative'>
            <h3 className='text-xl font-bold text-center'>Find your Ride</h3>
            <form onSubmit={handleOnSubmit}>
                <input
                className='border border-gray-300 bg-blue-50 text-lg text-black p-2 px-3 rounded-md w-full mb-4 mt-2'
                name="origin"
                value={pickupDestinationData.origin}
                onChange={handlePickupChange}
                onFocus={() => {
                  setActiveField('origin');
                  setLocationPanelOpen(true);
                }}
                type="text"
                placeholder='Enter origin location' />
                <input
                className='border border-gray-300 bg-blue-50 text-lg text-black p-2 px-3 rounded-md w-full'
                name="destination"
                value={pickupDestinationData.destination}
                onChange={handleDestinationChange}
                onFocus={() => {
                  setActiveField('destination');
                  setLocationPanelOpen(true);
                }}
                type="text"
                placeholder='Enter drop location'
                />
                
            </form>
            <button
            className=' bg-blue-500 text-white p-2 font-semibold rounded-full w-full mt-4'
            onClick={findTripNow}
           
            >
                  Find Ride
            </button>
            <h2 className='absolute top-[88%] left-1/2 transform -translate-x-1/2 text-xl'
                onClick={() => setLocationPanelOpen(!locationPanelOpen)}
                >
                 {locationPanelOpen ? <RiArrowDownWideFill /> : <RiArrowUpWideFill/>}
            </h2>
          </div>

          {/* Suggestions */}
          <div ref={panelRef} className='h-[0] bg-white '>
              <LocationSuggestionPanel
              setLocationPanelOpen={setLocationPanelOpen}
              setAllVehiclesInAreaPanel={setAllVehiclesInAreaPanel}
              setPickupDestinationData={setPickupDestinationData}
              suggestions={activeField === 'origin' ? pickupSuggestions : destinationSuggestions}
              activeField={activeField}
              />
          </div>
        </div>

        {/*Ride Suggestions*/}
        <div ref={allVehiclesInAreaPanelRef} className='fixed z-10 w-full bg-white px-3 py-5 bottom-0 translate-y-full'>
          {/* vehicle in that area component */}
          <VehiclesInThatArea
          setSelectVehicleType={setSelectVehicleType}
          journeyDetails={journeyDetails}
          setConfirmDetailsOfVehiclesPanel={setConfirmDetailsOfVehiclesPanel}
          setAllVehiclesInAreaPanel={setAllVehiclesInAreaPanel}/>
        </div>


        {/*Confirm Details Of Rides*/}
        <div ref={confirmDetailsOfVehiclesPanelRef} className='fixed z-10 w-full bg-white px-3 py-5 bottom-0 translate-y-full pt-4'>
          {/* vehicle in that area component */}
          <UserRideConfirmationDetailsOfVehicles
          startJourneyNow={startJourneyNow}
          origin={pickupDestinationData.origin}
          destination={pickupDestinationData.destination}
          selectVehicleType={selectVehicleType}
          journeyDetails={journeyDetails}
          setConfirmDetailsOfVehiclesPanel={setConfirmDetailsOfVehiclesPanel}
          setUserLookingForaRiderVehicleFound={setUserLookingForaRiderVehicleFound}
          />
        </div>


        {/*Looking for Rider*/}
        <div ref={userLookingForaRiderVehicleFoundRef} className='fixed z-10 w-full bg-white px-3 py-5 bottom-0 translate-y-full pt-4'>
          {/* vehicle in that area component */}
          <UserLookingForaRiderToVehicleFoundAndWaitingRiderToAcceptRequest
          origin = {pickupDestinationData.origin}
          destination = {pickupDestinationData.destination}
          journeyDetails={journeyDetails}
          selectVehicleType={selectVehicleType}
          setUserLookingForaRiderVehicleFound={setUserLookingForaRiderVehicleFound}
          />
        </div>


        {/*Waiting for Rider*/}
        <div ref={userWaitingForRiderAcceptanceRef} className='fixed z-10 w-full bg-white px-3 py-5 bottom-0 translate-y-full pt-4'>
          {/* vehicle in that area component */}
          <UserGotRiderNowWaitingForRiderPickUp
          setUserGotRiderNowWaitingForRiderPickUp={setUserGotRiderNowWaitingForRiderPickUp}
          />
        </div>


    </div>
  )
}

export default UserHome
