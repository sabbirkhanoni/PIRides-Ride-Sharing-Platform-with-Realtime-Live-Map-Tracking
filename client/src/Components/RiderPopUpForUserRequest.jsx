import React from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { FaMoneyBillWave } from "react-icons/fa";
import { MdLocationSearching } from "react-icons/md";
import { RiArrowDownWideFill } from "react-icons/ri";

const RiderPopUpForUserRequest = ({ setRiderPopUpForUserReqPanel, setRiderConfirmUserReqPanel, userDetails}) => {

console.log("userDetailsIn log", userDetails.user.fullname.firstname);
  return (
    <div>
            <h4
                onClick={() => setRiderPopUpForUserReqPanel(false)}
                className='justify-center flex items-center font-semibold text-lg text-center pb-2'><RiArrowDownWideFill />
            </h4>
    
            <div className='text-center rounded-t-lg bg-orange-400 text-white p-2'>
                <h2 className=' font-semibold text-md'>User Sending For Ride Request</h2>
            </div>
    
            <div className='flex justify-center items-center flex-col'>

                <div className='w-full flex items-center justify-between p-2 border-b-1 border-gray-300 mb-2'>
                    <div className='flex flex-col items-center gap-1'>
                        <img className='h-13 rounded-full object-cover  ' src="../src/assets/rider.png" alt="user"/>
                        <h4 className='font-semibold text-black text-sm'>{userDetails.user.fullname.firstname + " " + userDetails.user.fullname.lastname}</h4>
                    </div>
                    <div>
                        <h3 className='font-semibold'>{3.4} KM</h3>
                        <h5 className='text-md font-bold flex items-center gap-1'><FaMoneyBillWave />{userDetails.moneyPayable} BDT</h5>
                    </div>
                </div>
    
                <div className='w-full space-y-2'>
                    <div className='flex items-center gap-3 border-gray-300 border-b-1 p-2 shadow-sm'>
                        <h2 className='text-lg bg-gray-100 rounded-full p-1'><IoLocationSharp /></h2>
                        <div>
                            <h3 className='font-bold'>Origin</h3>
                            <h5 className=' text-sm'>{userDetails.origin || 'Loading pickup location...'}</h5>
                        </div>
                    </div>
    
    
                    <div className='flex items-center gap-3 border-gray-300 border-b-1 p-2 shadow-sm'>
                        <h2 className='text-lg bg-gray-100 rounded-full p-1'><MdLocationSearching /></h2>
                        <div>
                            <h3 className='font-bold'>Destination</h3>
                            <h5 className='text-sm'>{userDetails.destination || 'Loading destination...'}</h5>
                        </div>
                    </div>
    
                </div>
    
            </div>
            <div className='flex items-center gap-2 justify-between'>
                <button
                    onClick={() => (setRiderPopUpForUserReqPanel(false), setRiderConfirmUserReqPanel(true))}
                    className='px-12 mt-3 bg-blue-500 text-white font-semibold py-2 rounded-full'
                    >Accept
                </button>
                <button
                    onClick={() => setRiderPopUpForUserReqPanel(false)}
                    className='px-12 mt-3 bg-red-400 text-white font-semibold py-2 rounded-full'
                    >Ignore
                </button>
            </div>
            
    </div>
  )
}

export default RiderPopUpForUserRequest
