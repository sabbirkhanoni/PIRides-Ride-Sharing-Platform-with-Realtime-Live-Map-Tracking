import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { RiderContextData } from '../Context/RiderContext';
import { useNavigate } from 'react-router-dom';
import  toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryAPI from '../Common/SummaryAPI';
import AxiosToastError from '../utils/AxiosToastError';

const RiderRegister = () => {
  const [data, setData] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
    password: "",
    vehicle : {
      color: "",
      plate: "",
      capacity: "",
      type: ""
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  //context
  const { rider, setRider } = useContext(RiderContextData);

  //navigate
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('vehicle.')) {
      const vehicleField = name.split('.')[1];
      setData((prev) => ({
        ...prev,
        vehicle: {
          ...prev.vehicle,
          [vehicleField]: value,
        }
      }));
    } else if (name.startsWith('fullname.')) {
      const nameField = name.split('.')[1];
      setData((prev) => ({
        ...prev,
        fullname: {
          ...prev.fullname,
          [nameField]: value,
        }
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Send data to the backend
    try {
      const response = await Axios({
        ...SummaryAPI.RiderRegisterAPI,
        data: {
          fullname: {
            firstname: data.fullname.firstname,
            lastname: data.fullname.lastname
          },
          email: data.email,
          password: data.password,
          vehicle: {
            color: data.vehicle.color,
            plate: data.vehicle.plate,
            capacity: data.vehicle.capacity,
            type: data.vehicle.type
          }
        }
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        setRider(response.data.rider);
        localStorage.setItem('token', response.data.token);
        navigate('/rider-login');
      }

      // After submit, reset the form
      setData({
        fullname: {
          firstname: "",
          lastname: "",
        },
        email: "",
        password: "",
        vehicle : {
          color: "",
          plate: "",
          capacity: "",
          type: ""
      }
    });
    } catch (error) {
      AxiosToastError(error);
      setIsLoading(false);
    }finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-white flex items-center justify-center p-4  lg:bg-blue-50 md:bg-blue-50'>
      <div className='w-full max-w-md lg:border-2 lg:border-gray-200 lg:rounded-3xl lg:p-5 lg:shadow-lg md:bg-white md:border-gray-200 md:rounded-3xl md:p-5 md:shadow-lg'>
        {/* Logo and header */}
        <div className='text-center'>
          <div className='flex items-center justify-center'>
            <div className='w-20 h-15 bg-white flex items-center rounded-lg justify-center'>
              <img className='w-full h-full object-contain' src="/rider.png" alt="logo"/>
            </div>
          </div>
          <h1 className='text-xl font-semibold text-gray-900'>Rider Registration</h1>
        </div>

        {/* Main form */}
        <div className='bg-white rounded-3xl p-5'>
          <div className=''>
            <form className='space-y-3' onSubmit={handleOnSubmit}>
            
            {/* First Name and Last Name in same row */}
            <div className='grid grid-cols-2 gap-3'>
              {/* First Name field */}
              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-700' htmlFor='firstname'>
                  First Name
                </label>
                <div className='relative'>
                  <input
                    type="text"
                    name="fullname.firstname"
                    onChange={handleOnChange}
                    onFocus={() => setFocusedField('firstname')}
                    onBlur={() => setFocusedField(null)}
                    value={data.fullname.firstname}
                    required
                    placeholder='First name'
                    className={`w-full px-3 py-2 bg-blue-100 border-2 rounded-md text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:bg-white ${
                      focusedField === 'firstname' ? 'border-black shadow-sm' : 'border-gray-200'
                    }`}
                  />
                </div>
              </div>

              {/* Last Name field */}
              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-700' htmlFor='lastname'>
                  Last Name
                </label>
                <div className='relative'>
                  <input
                    type="text"
                    name="fullname.lastname"
                    onChange={handleOnChange}
                    onFocus={() => setFocusedField('lastname')}
                    onBlur={() => setFocusedField(null)}
                    value={data.fullname.lastname}
                    placeholder='Last name'
                    className={`w-full px-3 py-2 bg-blue-100 border-2 rounded-md text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:bg-white ${
                      focusedField === 'lastname' ? 'border-black shadow-sm' : 'border-gray-200'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Email field */}
            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-700' htmlFor='email'>
                Rider's Email
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
                Rider's Password
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

            {/* Vehicle Information Section */}
            <div className='space-y-3'>
              <h3 className='text-md font-medium text-gray-900 border-b border-gray-200 pb-2'>
                Vehicle Information
              </h3>
              
              {/* Vehicle Color and Plate in same row */}
              <div className='grid grid-cols-2 gap-3'>
                {/* Vehicle Color */}
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-700' htmlFor='vehicleColor'>
                    Vehicle Color
                  </label>
                  <div className='relative'>
                    <input
                      type="text"
                      name="vehicle.color"
                      onChange={handleOnChange}
                      onFocus={() => setFocusedField('vehicleColor')}
                      onBlur={() => setFocusedField(null)}
                      value={data.vehicle.color}
                      required
                      placeholder='e.g. Red'
                      className={`w-full px-3 py-2 bg-blue-100 border-2 rounded-md text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:bg-white ${
                        focusedField === 'vehicleColor' ? 'border-black shadow-sm' : 'border-gray-200'
                      }`}
                    />
                  </div>
                </div>

                {/* Vehicle Plate */}
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-700' htmlFor='vehiclePlate'>
                    Plate Number
                  </label>
                  <div className='relative'>
                    <input
                      type="text"
                      name="vehicle.plate"
                      onChange={handleOnChange}
                      onFocus={() => setFocusedField('vehiclePlate')}
                      onBlur={() => setFocusedField(null)}
                      value={data.vehicle.plate}
                      required
                      placeholder='ABC-1234'
                      className={`w-full px-3 py-2 bg-blue-100 border-2 rounded-md text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:bg-white ${
                        focusedField === 'vehiclePlate' ? 'border-black shadow-sm' : 'border-gray-200'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Vehicle Type and Capacity in same row */}
              <div className='grid grid-cols-2 gap-3'>
                {/* Vehicle Type */}
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-700' htmlFor='vehicleType'>
                    Vehicle Type
                  </label>
                  <div className='relative'>
                    <select
                      name="vehicle.type"
                      onChange={handleOnChange}
                      onFocus={() => setFocusedField('vehicleType')}
                      onBlur={() => setFocusedField(null)}
                      value={data.vehicle.type}
                      required
                      className={`w-full px-3 py-2 bg-blue-100 border-2 rounded-md text-gray-900 transition-all duration-200 focus:outline-none focus:bg-white ${
                        focusedField === 'vehicleType' ? 'border-black shadow-sm' : 'border-gray-200'
                      }`}
                    >
                      <option value="" disabled>Select type</option>
                      <option value="Car">Car</option>
                      <option value="Bike">Bike</option>
                      <option value="Auto">Auto</option>
                    </select>
                  </div>
                </div>

                {/* Vehicle Capacity */}
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-700' htmlFor='vehicleCapacity'>
                    Capacity
                  </label>
                  <div className='relative'>
                    <input
                      type="number"
                      name="vehicle.capacity"
                      onChange={handleOnChange}
                      onFocus={() => setFocusedField('vehicleCapacity')}
                      onBlur={() => setFocusedField(null)}
                      value={data.vehicle.capacity}
                      required
                      min="1"
                      max="8"
                      placeholder='e.g. 4'
                      className={`w-full px-3 py-2 bg-blue-100 border-2 rounded-md text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:bg-white ${
                        focusedField === 'vehicleCapacity' ? 'border-black shadow-sm' : 'border-gray-200'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className='w-full bg-blue-500 text-white py-2 px-6 mt-2 font-medium rounded-full transition-all hover:bg-blue-600'
            >
              {isLoading ? (
                <div className='flex items-center justify-center space-x-2'>
                  <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign Up As Rider'
              )}
            </button>
            </form>
          </div>

          {/* Register link */}
          <p className='text-center text-gray-600 mt-5 text-sm'>
            Already have an account?{' '}
            <Link
              to='/rider-login'
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

export default RiderRegister;