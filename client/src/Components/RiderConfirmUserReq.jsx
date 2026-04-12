import React, { useRef, useState } from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { FaMoneyBillWave } from "react-icons/fa";
import { MdLocationSearching } from "react-icons/md";
import { RiArrowDownWideFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';


const RiderConfirmUserReq = ({ setRiderConfirmUserReqPanel }) => {


    //navigate
    const navigate = useNavigate();

const handleSubmit = (e) => {
    e.preventDefault();
    
    navigate('/rider-riding');
    setRiderConfirmUserReqPanel(false);

  }


  return (
    <div>
        <h4
            onClick={() => setRiderConfirmUserReqPanel(false)}
            className='justify-center flex items-center font-semibold text-lg text-center pb-2'><RiArrowDownWideFill />
        </h4>

        <div className='text-center rounded-t-lg bg-orange-400 text-white p-2'>
            <h2 className=' font-semibold text-md'>Confirm The Ride</h2>
        </div>

        <div className='flex justify-center items-center flex-col'>

            <div className='w-full flex items-center justify-between p-2 border-b-1 border-gray-300 mb-2'>
                <div className='flex flex-col items-center gap-1'>
                    <img className='h-13 rounded-full object-cover  ' src="/khan.avif" alt="user"/>
                    <h4 className='font-semibold text-black'>Rider Name</h4>
                </div>
                <div>
                    <h3 className='font-semibold'>3.5 KM</h3>
                    <h5 className='text-md font-bold flex items-center gap-1'><FaMoneyBillWave /> 500 BDT</h5>
                </div>
            </div>

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

            </div>

        </div>

        <div className='w-full items-center gap-2'>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    className="border mt-3 w-full border-gray-700 p-2 text-xl rounded-md mr-2 focus-within:border-blue-500 bg-blue-100"
                    required
                />

                <div className='flex justify-between gap-7'>
                    <button
                        type='submit'
                        className='w-full px-12 mt-3 bg-blue-500 text-white font-semibold py-2 rounded-full flex justify-center items-center'
                        >Confirm
                    </button>

                    <button
                        type='button'
                        onClick={() => (setRiderConfirmUserReqPanel(false))}
                        className='w-full px-12 mt-3 bg-red-500 text-white font-semibold py-2 rounded-full'
                        >Cancel
                    </button> 
                </div>
            </form>
        </div>
                
    </div>
  )
}

export default RiderConfirmUserReq
