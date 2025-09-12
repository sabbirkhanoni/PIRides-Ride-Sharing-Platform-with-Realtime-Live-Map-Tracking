import React from 'react'
import { Link } from 'react-router-dom'

const StartingHome = () => {
  return (
    <div> 
      <div className='bg-cover bg-center bg-[url(../src/assets/Home.png)] h-screen w-full bg-blue-200 flex justify-between flex-col pt-10'>
        <img src="../src/assets/pirides.png" alt="logo" className='w-20 ml-10'/>
        <div className='bg-white p-5 '>
            <h1 className='text-2xl flex justify-center items-center font-bold mb-2'>Welcome to PIRides</h1>
            <Link to='/user-login'  className='flex items-center justify-center w-full bg-blue-500 rounded-full text-white py-3'>
                Get Started 
            </Link>
        </div>

      </div>
    </div>
  )
}

export default StartingHome
