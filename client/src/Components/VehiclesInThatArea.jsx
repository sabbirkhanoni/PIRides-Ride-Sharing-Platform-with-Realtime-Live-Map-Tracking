import React from 'react'
import { RiArrowDownWideFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";

const VehiclesInThatArea = ({setConfirmDetailsOfVehiclesPanel,setAllVehiclesInAreaPanel}) => {
  return (
    <div className='space-y-2'>
        <h4
            onClick={() => setAllVehiclesInAreaPanel(false)}
            className='justify-center flex items-center font-semibold text-lg text-center'><RiArrowDownWideFill />
        </h4>
          <div className='text-center rounded-t-lg bg-blue-100 p-2'>
            <h2 className=' font-semibold text-xl'>Choose a Ride</h2>
          </div>

          {/* Single Ride */}
          <div 

          onClick={() => { setConfirmDetailsOfVehiclesPanel(true); setAllVehiclesInAreaPanel(false); }}
          
          className='flex items-center p-2 justify-between border-3  border-gray-400 rounded-lg  hover:bg-blue-50 hover:border-gray-500 active:border-black'>
            <img className='h-12' src="../src/assets/car.webp" alt="car"/>
            <div className='w-1/2'>
              <h3 className='text-md flex flex-wrap items-center font-medium gap-x-2'>Name<span className='font-bold text-sm'><FaUser/></span>4</h3>
              <h5 className='text-gray-500'>2 min Away</h5>
              <p className='bg-green-200/50 text-center border border-green-300 rounded-full py-1 text-xs'>Recommended</p>
            </div>
            <h3 className='font-semibold text-xl mr-2'>200 bdt</h3>
          </div>

          {/* Single Ride */}
          <div className='flex items-center p-2 justify-between border-3  border-gray-400 rounded-lg hover:bg-blue-50 hover:border-gray-500 active:border-black'>
            <img className='h-12 ml-2' src="../src/assets/bike.jpeg" alt="bike"/>
            <div className='w-1/2'>
              <h3 className='text-md flex flex-wrap items-center font-medium gap-x-2'>Moto Bike<span className='font-bold text-sm'><FaUser/></span>4</h3>
              <h5 className='text-gray-500'>2 min Away</h5>
              <p className='bg-green-200/50 text-center border border-green-300 rounded-full py-1 text-xs'>Recommended</p>
            </div>
            <h3 className='font-semibold text-xl mr-2'>200 bdt</h3>
          </div>

          {/* Single Ride */}
          <div className='flex items-center p-2 justify-between border-3  border-gray-400 hover:bg-blue-50 hover:border-gray-500 rounded-lg active:border-black'>
            <img className='h-12 ml-2' src="../src/assets/auto.jpeg" alt="auto"/>
            <div className='w-1/2'>
              <h3 className='text-md flex flex-wrap items-center font-medium gap-x-2'>Cng Auto<span className='font-bold text-sm'><FaUser/></span>4</h3>
              <h5 className='text-gray-500'>2 min Away</h5>
              <p className='bg-green-200/50 text-center border border-green-300 rounded-full py-1 text-xs'>Recommended</p>
            </div>
            <h3 className='font-semibold text-xl mr-2'>200 bdt</h3>
          </div>
    </div>
  )
}

export default VehiclesInThatArea
