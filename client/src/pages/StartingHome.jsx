import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
const StartingHome = () => {
  const [clicked, setClicked] = useState(null);
  const [menuClicked, setMenuClicked] = useState(false);

  return (
    <div className="h-screen w-full bg-white">
      <div className="w-full bg-white shadow-xl">
        <div className='flex justify-between items-center py-5'>
        <div className='ml-5'>
          <img src="../src/assets/pirides.png" alt="logo" className="h-8 w-15" />
        </div>

        <div className='mr-4'>
          <ul className="flex space-x-2  relative font-semibold">
            
            <li className={`hover:bg-gray-200 px-3 py-2 rounded-full hidden md:block lg:block`}>
              <Link to={"/contact"}>Contact Us</Link>
            </li>
            <li className={`hover:bg-gray-200 px-3 py-2 rounded-full hidden md:block lg:block`}>
              <Link to={"/report"}>Report</Link>
            </li>

            <li
              className="relative"
              onClick={() => setClicked(clicked === 'login' ? null : 'login')}
            >
              <button className="bg-blue-500 py-2  rounded-full px-5 text-white hover:bg-blue-600 text-sm lg:text-md">
                Login
              </button>

              {clicked === 'login' && (
                <div className="absolute left-0 top-full mt-2 w-30 py-3 bg-white rounded-lg shadow-2xl border-2 border-gray-200 z-10">
                  <ul className="flex flex-col text-gray-700">
                    <li className="hover:bg-gray-100 px-4 py-2 rounded-t-lg">
                      <Link to="/user-login">As User</Link>
                    </li>
                    <li className="hover:bg-gray-100 px-4 py-2 rounded-b-lg">
                      <Link to="/rider-login">As Rider</Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            <li
              className="relative"
              onClick={() => setClicked(clicked === 'register' ? null : 'register')}
            >
              <button className="bg-black  py-2 text-sm lg:text-md font-semibold rounded-full px-5 text-white hover:bg-blue-600">
                Register
              </button>

              {clicked === 'register' && (
                <div className="absolute left-0 top-full mt-2 w-30 py-3 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                  <ul className="flex flex-col text-gray-700">
                    <li className="hover:bg-gray-100 px-4 py-2 rounded-t-lg">
                      <Link to="/user-register">As User</Link>
                    </li>
                    <li className="hover:bg-gray-100 px-4 py-2 rounded-b-lg">
                      <Link to="/rider-register">As Rider</Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            <li>
              <button
              className='text-4xl lg:hidden md:hidden'
              onClick={() => setMenuClicked(!menuClicked)}>
                <IoMenu />
              </button>

              {menuClicked && (
                <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-lg shadow-2xl border border-gray-200 z-10">
                  <ul className="flex flex-col text-gray-700">
                    <li className="hover:bg-gray-100 px-4 py-2 rounded-t-lg">
                      <Link to="/about" onClick={() => setMenuClicked(false)}>About Us</Link>
                    </li>
                    <li className="hover:bg-gray-100 px-4 py-2">
                      <Link to="/contact" onClick={() => setMenuClicked(false)}>Contact Us</Link>
                    </li>
                    <li className="hover:bg-gray-100 px-4 py-2 rounded-b-lg">
                      <Link to="/report" onClick={() => setMenuClicked(false)}>Report</Link>
                    </li>
                  </ul>
                </div>
              )}

            </li>
          </ul>
        </div>
      </div>
      </div>

    <div className='mt-10 items-center px-12'
     onClick={() => setClicked(null)}
    >

        <div className='grid lg:grid-cols-2 gap-4 mt-10 justify-items-center items-center-safe'>
          <div>
            <h1 className='text-4xl font-bold'>Log in to see your account details</h1>
            <p className='mt-2 text-gray-600'>Please enter your credentials to access your account.</p>
            <p className='mt-2 text-gray-600'>Please have your login information ready.</p>
            <p className='mt-2 text-gray-600'>If you don't have an account, please register first.</p>
            <p className='mt-2 text-gray-600'>Thank you for choosing our service!</p>
          </div>
          <div>
            <img
            className='object-scale-down h-full w-full'
            src="../src/assets/safeRides.jpeg" alt="login" />
          </div>
        </div>


        <div className='grid lg:grid-cols-2 gap-4 mt-30 justify-items-center items-center-safe'>
          <div>
            <img
            className='object-scale-down h-full w-full'
            src="../src/assets/secureRides.jpeg" alt="login" />
          </div>
          <div>
            <h1 className='text-4xl font-bold'>Benefits</h1>
            <p className='mt-2 text-gray-600'>Access to exclusive features</p>
            <p className='mt-2 text-gray-600'>Personalized ride options</p>
            <p className='mt-2 text-gray-600'>Priority customer support</p>
            <p className='mt-2 text-gray-600'>Seamless payment integration</p>
          </div>
        </div>



        <div className='grid lg:grid-cols-2 gap-4 mt-30 justify-items-center items-center-safe'>
          <div>
            <h1 className='text-4xl font-bold'>Drive when you want, make what you need</h1>
            <p className='mt-2 text-gray-600'>Flexible scheduling options</p>
            <p className='mt-2 text-gray-600'>Competitive earnings</p>
            <p className='mt-2 text-gray-600'>Easy-to-use app interface</p>
            <p className='mt-2 text-gray-600'>Supportive community</p>
          </div>
          <div>
            <img
            className='object-scale-down h-full w-full'
            src="../src/assets/mapSet.jpeg" alt="login" />
          </div>
        </div>



        <div className='grid lg:grid-cols-2 gap-4 mt-30 justify-items-center items-center-safe'>
          <div>
            <img
            className='object-scale-down h-full w-full'
            src="../src/assets/enjoyRides.jpeg" alt="login" />
          </div>
            <div>
            <h1 className='text-4xl font-bold'>Safety</h1>
            <p className='mt-2 text-gray-600'>Your safety is our top priority.</p>
            <p className='mt-2 text-gray-600'>We conduct thorough background checks on all drivers.</p>
            <p className='mt-2 text-gray-600'>In-app emergency features are available for all users.</p>
            <p className='mt-2 text-gray-600'>Ride tracking is enabled for added security.</p>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-4 mt-10 px-10">
        <div className="container mx-auto text-center">
          
          <div className='flex justify-between items-center'>
            <div className=''>
              <img
              src="../src/assets/pirides2.png" alt="Logo"
              className='h-8 w-15'
              />
            </div>
            <div>Ride Sharing Related Details</div>
          </div>

          <div className='grid lg:grid-cols-4  md:grid-cols-2 gap-8 mt-8 text-left lg:justify-items-center text-gray-300 hover:text-white text-sm'>
            <div>
              <h2 className='text-lg font-bold'>Company</h2>
              <ul>
                <li><Link to="/about-us" className="hover:underline">About Us</Link></li>
                <li><Link to="/careers" className="hover:underline">Careers</Link></li>
                <li><Link to="/blog" className="hover:underline">Blog</Link></li>
                <li><Link to="/press" className="hover:underline">Press</Link></li>
                <li><Link to="/terms" className="hover:underline">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
                <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
              </ul>
            </div>

            <div>
              <h2 className='text-lg font-bold'>Support</h2>
              <ul>
                <li><Link to="/help" className="hover:underline">Help Center</Link></li>
                <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
                <li><Link to="/contact-support" className="hover:underline">Contact Support</Link></li>
              </ul>
            </div>

            <div>
              <h2 className='text-lg font-bold'>Legal</h2>
              <ul>
                <li><Link to="/terms" className="hover:underline">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
              </ul>
            </div>

            <div>
              <h2 className='text-lg font-bold'>Social</h2>
              <ul>
                <div className='flex items-center'>
                  <FaFacebook className=' mr-2' />
                <li><Link to="/facebook" className="hover:underline">Facebook</Link></li>
                </div>
                <div className='flex items-center'>
                  <FaTwitter className='mr-2' />
                <li><Link to="/twitter" className="hover:underline">Twitter</Link></li>
                </div>
                <div className='flex items-center'>
                  <FaInstagram className='mr-2' />
                <li><Link to="/instagram" className="hover:underline">Instagram</Link></li>
                </div>
              </ul>
            </div>

          </div>

          <p className='mt-20 text-xs text-gray-200'>&copy; 2023 PI Rides. All rights reserved.</p>
        </div>
      </footer>
    
    </div>
  );
};

export default StartingHome;
