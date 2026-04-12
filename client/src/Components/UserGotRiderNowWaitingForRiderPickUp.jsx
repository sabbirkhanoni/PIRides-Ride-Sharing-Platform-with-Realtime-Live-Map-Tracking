import React from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { MdLocationSearching } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";
import { RiArrowDownWideFill } from 'react-icons/ri'

const UserGotRiderNowWaitingForRiderPickUp = ({setUserGotRiderNowWaitingForRiderPickUp}) => {
  return ( 
    <div>
            <h4
                onClick={() => setUserGotRiderNowWaitingForRiderPickUp(false)}
                className='justify-center flex items-center font-semibold text-lg text-center pb-2'><RiArrowDownWideFill />
            </h4>
    
            <div className='text-center rounded-t-lg bg-blue-100 p-2'>
                <h2 className=' font-semibold text-xl'>Waiting For Rider</h2>
            </div>

            <div className='flex items-center justify-between p-1 border-b-1 border-gray-300 mb-2 py-2'>
                <img className='h-15' src="/car.webp" alt="car"/>
                <div>
                    <h3 className='font-semibold text-md'>Rider Name</h3>
                    <h5 className='font-semibold text-xl'>ABC-129A</h5>
                    <p className='text-md'>Toyota Premio</p>
                </div>
            </div>
    
            <div className='flex justify-center items-center flex-col'>
                
    
                <div className='w-full space-y-2'>
                    <div className='flex items-center gap-3 border-gray-300 border-b-1 p-2 shadow-sm'>
                        <h2 className='text-lg bg-gray-100 rounded-full p-1'><IoLocationSharp /></h2>
                        <div>
                            <h3 className='font-bold'>ABC-123</h3>
                            <h5 className=' text-sm'>Gulshan 2, Dhaka,Bangladesh</h5>
                        </div>
                    </div>
    
    
                    <div className='flex items-center gap-3 border-gray-300 border-b-1 p-2 shadow-sm'>
                        <h2 className='text-lg bg-gray-100 rounded-full p-1'><MdLocationSearching /></h2>
                        <div>
                            <h3 className='font-bold'>ABC-123</h3>
                            <h5 className='text-sm'>Banani, Dhaka,Bangladesh</h5>
                        </div>
                    </div>
    
    
                    <div className='flex items-center gap-3 border-gray-300 border-b-1 p-2 shadow-sm'>
                        <h2 className='text-lg bg-gray-100 rounded-full p-1'><FaMoneyBillWave /></h2>
                        <div>
                            <h3 className='font-bold'>199 BDT</h3>
                            <h5 className='text-sm'>Payment</h5>
                        </div>
                    </div>
    
                </div>
    
            </div>
    
            <button
            onClick={() => (setUserLookingForaRiderVehicleFound(true),setConfirmDetailsOfVehiclesPanel(false))}
            className='w-full mt-4 bg-blue-500 text-white font-semibold py-2 rounded-full'
            >Confirm Your Ride Now</button>
            
        </div>
  )
}

export default UserGotRiderNowWaitingForRiderPickUp;
