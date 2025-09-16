import React from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { Link } from 'react-router-dom';
const UserRidingIntoVehicle = () => {
  return (
    <div className='h-screen w-screen'>
        <Link to={'/user-home'}
        className='fixed p-2 flex items-center ml-3 mt-3 text-sm bg-white text-black border-2 border-blue-700 rounded-full'
        ><FaHome />
        </Link>
       <div className='h-[51%] w-full'>
          <img onClick={() => setAllVehiclesInAreaPanel(false)} className='h-full w-full object-cover' src="../src/assets/mapDemo.png" alt="map"/>
       </div>
    
       <div className='h-[49%] p-2'>
        <div className='text-center rounded-t-lg bg-blue-100 p-2'>
        <h2 className=' font-semibold text-md'>Enjoy Your Riding</h2>
        </div>

        <div className='flex items-center justify-between p-1 border-b-1 border-gray-300 mb-2 py-2'>
            <img className='h-15' src="../src/assets/car.webp" alt="car"/>
            <div>
                <h3 className='font-semibold text-sm'>Rider Name</h3>
                <h5 className='font-semibold text-md'>ABC-129A</h5>
                <p className='text-xs'>Toyota Premio</p>
            </div>
        </div>

        <div className='flex justify-center items-center flex-col'>
            

            <div className='w-full space-y-2'>
                <div className='flex items-center gap-3 border-gray-300 border-b-1 p-2 shadow-sm'>
                    <h2 className='text-md bg-gray-100 rounded-full p-1'><IoLocationSharp /></h2>
                    <div>
                        <h3 className='font-bold text-md'>ABC-123</h3>
                        <h5 className=' text-sm'>Gulshan 2, Dhaka,Bangladesh</h5>
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
        >
            Pay Now
        </button>
       </div>



    </div>
  )
}

export default UserRidingIntoVehicle
