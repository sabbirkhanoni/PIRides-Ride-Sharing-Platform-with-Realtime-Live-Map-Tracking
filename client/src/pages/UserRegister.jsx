import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import  toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryAPI from '../Common/SummaryAPI';
import AxiosToastError from '../utils/AxiosToastError';
import { UserContextData } from '../Context/UserContext';

const UserRegister = () => {


  const [data, setData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
  });

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  //context
  const { user, setUser } = useContext(UserContextData);

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
      ...SummaryAPI.UserRegisterAPI,
      data : {
        fullname: {
          firstname: data.firstname,
          lastname: data.lastname
        },
        email: data.email,
        password: data.password
      }
    })

    if(response.data.error){
      toast.error(response.data.message)
    }

    if(response.data.success){
      toast.success(response.data.message)
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
      navigate('/user-login');
    }

    // After submit, reset the form
    setData({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    });
    setIsLoading(false);
    } catch (error) {
      AxiosToastError(error)
    }
  };

  return (
    <div className='min-h-screen bg-white flex items-center justify-center p-4  lg:bg-blue-50 md:bg-blue-50'>
      <div className='w-full max-w-md lg:border-2 lg:border-gray-200 lg:rounded-3xl lg:p-5 lg:shadow-lg md:bg-white md:border-gray-200 md:rounded-3xl md:p-5 md:shadow-lg'>
        {/* Logo and header */}
        <div className='text-center'>
          <div className='flex items-center justify-center'>
            <div className='w-20 h-15 bg-white flex items-center rounded-lg justify-center'>
              <img className='w-full h-full object-contain' src="../src/assets/pirides.png" alt="logo"/>
            </div>
          </div>
          <h1 className='text-xl font-semibold text-gray-900 mb-2'>User Registration</h1>
        </div>

        {/* Main form */}
        <div className='bg-white rounded-3xl p-5'>
          <div className=''>
            {/*First Name field */}
            <form className='space-y-5' onSubmit={handleOnSubmit}>
              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-700' htmlFor='firstName'>
                  First Name
                </label>
                <div className='relative'>
                  <input
                    type="text"
                    name="firstname"
                    onChange={handleOnChange}
                    onFocus={() => setFocusedField('firstname')}
                    onBlur={() => setFocusedField(null)}
                    value={data.firstname}
                    required
                    placeholder='Enter your first name'
                    className={`w-full px-4 py-2 bg-blue-100 border-2 rounded-md text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:bg-white ${
                      focusedField === 'firstname' ? 'border-black shadow-sm' : 'border-gray-200'
                    }`}
                  />
                </div>
              </div>

              {/* Last Name field */}
              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-700' htmlFor='lastName'>
                  Last Name
                </label>
                <div className='relative'>
                  <input
                    type="text"
                    name="lastname"
                    onChange={handleOnChange}
                    onFocus={() => setFocusedField('lastname')}
                    onBlur={() => setFocusedField(null)}
                    value={data.lastname}
                    placeholder='Enter your last name'
                    className={`w-full px-4 py-2 bg-blue-100 border-2 rounded-md text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:bg-white ${
                      focusedField === 'lastname' ? 'border-black shadow-sm' : 'border-gray-200'
                    }`}
                  />
                </div>
              </div>

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
                disabled={isLoading}
                className='w-full bg-blue-500 text-white py-2 px-6 font-medium rounded-full transition-all hover:bg-blue-600'
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
            </form>
        </div>

        {/* Register link */}
        <p className='text-center text-gray-600 mt-6 text-sm'>
            Already have an account?{' '}
            <Link
              to='/user-login'
              className='text-black font-medium hover:underline transition-all duration-200'
            >
              Sign In
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}

export default UserRegister;