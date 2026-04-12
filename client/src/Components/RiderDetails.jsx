import React, { useContext } from 'react'
import { FaMoneyBillWave } from "react-icons/fa";
import { SlSpeedometer } from "react-icons/sl";
import { MdBook } from "react-icons/md";
import { IoTimerOutline } from "react-icons/io5";
import { RiderContextData } from '../Context/RiderContext';

const RiderDetails = () => {

  const {rider} = useContext(RiderContextData);

  return (
    <div>
      <div className='flex items-center justify-between p-1 border-b-1 border-gray-300 mb-2 py-2'>
            <img className='h-15' src="/car.webp" alt="car"/>
            <div>
                <h3 className='font-semibold text-xl capitalize '>{rider?.fullname.firstname + " " + rider?.fullname.lastname || 'Unknown User'}</h3>
                <h5 className='font-semibold text-md'>ABC-129A</h5>
                <p className='text-xs'>Toyota Premio</p>
            </div>
        </div>

        <div className='flex justify-center items-center flex-col'>
            

            <div className='w-full space-y-1'>


                <div className='flex items-center gap-3 border-gray-300 border-b-1 p-2 shadow-sm'>
                    <h2 className='text-lg bg-gray-100 rounded-full p-1'><FaMoneyBillWave /></h2>
                    <div>
                        <h3 className='font-md'>Earnings</h3>
                        <h5 className='text-md font-bold'>5000 BDT</h5>
                    </div>
                </div>

                <div className='flex items-center gap-20 justify-center bg-green-100 p-1 rounded shadow-sm'>
                  <div className='text-center font-bold'>
                    <div className='text-gray-500 flex items-center justify-center text-4xl'><IoTimerOutline /></div>
                    <h3 className=''>8.3</h3>
                    <p className='text-xs'>Hours Online</p>
                  </div>
                  <div className='text-center font-bold'>
                    <div className='text-gray-500 flex items-center justify-center text-3xl'><SlSpeedometer /></div>
                    <h3 className='mt-2'>120</h3>
                    <p className='text-xs'>Rides</p>
                  </div>
                  <div className='text-center font-bold'>
                    <div className='text-gray-500 flex items-center justify-center text-3xl'><MdBook/></div>
                    <h3 className='mt-2'>4.9</h3>
                    <p className='text-xs'>Rating</p>
                  </div>
                </div>

            </div>

        </div>
    </div>
  )
}

export default RiderDetails
