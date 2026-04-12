import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryAPI from '../Common/SummaryAPI';
import AxiosToastError from '../utils/AxiosToastError';
import { useNavigate } from 'react-router-dom';
import { RiderContextData } from '../Context/RiderContext';

const RiderLogin = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  //context
  const { rider, setRider } = useContext(RiderContextData);

  //navigate
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    //send data to the backend
    try{
      const response = await Axios({
        ...SummaryAPI.RiderLoginAPI,
        data: {
          email: data.email,
          password: data.password,
        }
      });

      if(response.data.error){
        toast.error(response.data.message);
      }

      if(response.data.success){
        toast.success(response.data.message);
        setRider(response.data.rider); // Update the rider context with the logged-in rider's data
        localStorage.setItem('token', response.data.token);
        navigate('/rider-home');
      }

    }catch (error) {
      AxiosToastError(error);
      setIsLoading(false);
    }finally {
      // After submit, reset the form
      setData({
        email: "",
        password: "",
      });
    setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-white flex items-center justify-center p-4'>
      <div className='w-full max-w-md lg:border-2 lg:border-gray-200 lg:rounded-3xl lg:p-5'>
        {/* Logo and header */}
        <div className='text-center'>
          <div className='flex items-center justify-center'>
            <div className='w-25 h-15 bg-white rounded-lg flex items-center justify-center'>
              <img className='w-full h-full object-contain' src="/rider.png" alt="logo"/>
            </div>
          </div>
          <h1 className='text-2xl font-bold text-gray-900 mb-2'>Rider</h1>
          <p className='text-gray-600'>Please sign in to your account</p>
        </div>

        {/* Main form */}
        <div className='bg-white rounded-3xl p-5'>
          <div className='space-y-5'>
            {/* Email field */}
            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-700' htmlFor='email'>
                Email
              </label>
              <div className='relative'>
                <input
                  type="email"
                  name="email"
                  onChange={handleOnChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  value={data.email}
                  required
                  placeholder='Enter your email'
                  className={`w-full px-4 py-2 bg-blue-100 border-2 rounded-md text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:bg-white ${
                    focusedField === 'email' ? 'border-black shadow-sm' : 'border-gray-200'
                  }`}
                />
              </div>
            </div>

            {/* Password field */}
            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-700' htmlFor='password'>
                Password
              </label>
              <div className='relative'>
                <input
                  type="password"
                  name="password"
                  onChange={handleOnChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  value={data.password}
                  placeholder='Enter your password'
                  required
                  className={`w-full px-4 py-2 bg-blue-100 border-2 rounded-md text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:bg-white ${
                    focusedField === 'password' ? 'border-black shadow-sm' : 'border-gray-200'
                  }`}
                />
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              onClick={handleOnSubmit}
              disabled={isLoading}
              className='w-full bg-black text-white py-2 px-6 font-medium rounded-full transition-all hover:bg-blue-600'
            >
              {isLoading ? (
                <div className='flex items-center justify-center space-x-2'>
                  <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>

          {/* Register link */}
          <p className='text-center text-gray-600 mt-6 text-sm'>
            New Here?{' '}
            <Link
              to='/rider-register'
              className='text-black underline font-medium hover:underline transition-all duration-200'
            >
              Join as Rider
            </Link>
          </p>
        </div>

        {/* Footer text */}
        <p className='text-center text-xs text-gray-500 mt-20'>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}

export default RiderLogin;