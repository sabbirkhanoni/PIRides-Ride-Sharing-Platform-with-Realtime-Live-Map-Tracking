import { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaPlane, FaCar, FaLock, FaCreditCard, FaStar, FaCheck, FaPlaneArrival } from "react-icons/fa";
import { IoMenu, IoClose } from "react-icons/io5";
import { FadeUp } from "../utils/FadeUp";





export default function StartingHome() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <div className="bg-white min-h-screen" onClick={() => setOpenMenu(null)}>

    
      <nav className={`fixed top-0 inset-x-0 z-50 bg-white transition-shadow duration-300`}
        onClick={e => e.stopPropagation()}>
        <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-16">

          <Link to="/"><img src="/pirides.png" alt="PI Rides" className="h-8" /></Link>

         
          <div className="hidden md:flex items-center gap-1">
            <Link to="/contact" className="text-sm text-gray-500 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition font-medium">Contact</Link>
            <Link to="/report"  className="text-sm text-gray-500 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition font-medium">Report</Link>

            <div className="relative ml-2" onClick={e => { e.stopPropagation(); setOpenMenu(openMenu === "login" ? null : "login"); }}>
              <button className="text-sm font-semibold border-2 border-gray-200 hover:border-gray-800 px-5 py-2 rounded-xl transition">Log in</button>
              {openMenu === "login" && (
                <div className="absolute right-0 top-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden w-40 z-50">
                  <Link to="/user-login"  onClick={() => setOpenMenu(null)} className="block px-5 py-3 text-sm hover:bg-gray-50 font-medium">As Rider</Link>
                  <Link to="/rider-login" onClick={() => setOpenMenu(null)} className="block px-5 py-3 text-sm hover:bg-gray-50 font-medium border-t border-gray-100">As Driver</Link>
                </div>
              )}
            </div>

            <div className="relative ml-1" onClick={e => { e.stopPropagation(); setOpenMenu(openMenu === "register" ? null : "register"); }}>
              <button className="text-sm font-bold bg-gray-900 hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl transition">Sign up free</button>
              {openMenu === "register" && (
                <div className="absolute right-0 top-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden w-40 z-50">
                  <Link to="/user-register"  onClick={() => setOpenMenu(null)} className="block px-5 py-3 text-sm hover:bg-gray-50 font-medium">As Rider</Link>
                  <Link to="/rider-register" onClick={() => setOpenMenu(null)} className="block px-5 py-3 text-sm hover:bg-gray-50 font-medium border-t border-gray-100">As Driver</Link>
                </div>
              )}
            </div>
          </div>

          <button className="md:hidden text-2xl text-gray-700" onClick={e => { e.stopPropagation(); setMobileNav(true); }}>
            <IoMenu />
          </button>
        </div>
      </nav>

      
      {mobileNav && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col p-6" onClick={e => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-8">
            <img src="/pirides.png" alt="PI Rides" className="h-8" />
            <button className="text-2xl" onClick={() => setMobileNav(false)}><IoClose /></button>
          </div>
          {[["Contact", "/contact"], ["Report", "/report"], ["Login as Rider", "/user-login"], ["Login as Driver", "/rider-login"]].map(([l, to]) => (
            <Link key={to} to={to} onClick={() => setMobileNav(false)}
              className="py-4 border-b border-gray-100 text-lg font-semibold text-gray-800">{l}</Link>
          ))}
          <div className="flex flex-col gap-3 mt-8">
            <Link to="/user-register"  onClick={() => setMobileNav(false)}><button className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl">Sign up as Rider</button></Link>
            <Link to="/rider-register" onClick={() => setMobileNav(false)}><button className="w-full border-2 border-gray-200 font-bold py-4 rounded-2xl">Sign up as Driver</button></Link>
          </div>
        </div>
      )}

     
      <section className="pt-36 pb-20 px-5 bg-gradient-to-br from-blue-50 via-white to-white min-h-[90vh] flex items-center">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center w-full">
          <div>
            <span className="inline-flex items-center gap-2 animate-bounce bg-blue-50 text-blue-600 text-xs font-bold px-4 py-1.5 rounded-full mb-6 border border-blue-300">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
              Now available in Dhaka
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-900 mb-5">
              Your ride,<br />
              <span className="text-blue-600">on your terms.</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-md mb-9">
              PI Rides connects you with trusted drivers in minutes. Safe, affordable, and reliable every single trip.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <Link to="/user-register">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl transition hover:-translate-y-0.5">
                  Request a ride
                </button>
              </Link>
              <Link to="/rider-register">
                <button className="border-2 border-gray-200 hover:border-gray-900 font-bold px-8 py-4 rounded-2xl transition hover:-translate-y-0.5">
                  Become a driver
                </button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-5">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 text-xs font-bold flex items-center justify-center"><FaCheck/> </span>
                  <span className="text-sm text-gray-500 font-medium">No hidden fees</span>
                </div>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] hover:scale-105 transition-transform">
            <img src="/safeRides.jpeg" alt="Safe rides" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

     
      <div className="border-y border-gray-100 bg-gray-50 py-5 px-5">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-5 divide-x divide-gray-200">
          {[["5+", "Riders"], ["12+", "Drivers"], ["20+", "Trips"], ["24/7", "Support"]].map(([n, l]) => (
            <div key={l} className="text-center px-4 py-2">
              <p className="text-2xl font-extrabold text-gray-900">{n}</p>
              <p className="text-xs text-gray-400 font-medium mt-0.5">{l}</p>
            </div>
          ))}
        </div>
      </div>

    
      <section className="py-24 px-5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <div className="rounded-3xl overflow-hidden shadow-xl aspect-[4/3] hover:scale-105 transition-transform">
              <img src="/secureRides.jpeg" alt="Secure rides" className="w-full h-full object-cover" />
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <span className="inline-block bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 animate-bounce">Benefits</span>
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">More than just a ride.</h2>
            <p className="text-gray-500 leading-relaxed mb-7">
              We built PI Rides around what passengers actually need not just getting somewhere, but getting there well.
            </p>
            <div className="space-y-3">
              {["Access to exclusive features", "Personalized ride options", "Priority customer support", "Seamless payment integration"].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold flex items-center justify-center flex-shrink-0"><FaCheck/> </span>
                  <span className="text-sm text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>


      <section className="py-24 px-5 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <span className="inline-block bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 animate-bounce">Why PI Rides</span>
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">Everything in one app.</h2>
            <p className="text-gray-500 mb-12 max-w-md leading-relaxed">Simple and safe, designed so anyone can use it from day one.</p>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <FaCar />, title: "Ride in minutes",  body: "Matched with a nearby driver in under 2 minutes, any time." },
              { icon: <FaLock />, title: "Safe every trip",  body: "Background-checked drivers, real-time GPS and in-app SOS." },
              { icon: <FaCreditCard />, title: "Easy payments",    body: "Card, mobile wallet or cash — no surprises on your receipt." },
              { icon: <FaStar />, title: "Earn your way",    body: "Drivers set their own hours and get weekly direct deposits." },
            ].map((f, i) => (
              <FadeUp key={i} delay={i * 80}>
                <div className="bg-white rounded-2xl border shadow-md border-gray-100 p-7 hover:shadow-xl hover:-translate-y-5 transition-all duration-300 h-full">
                  <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center text-xl mb-5">{f.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

     
      <section className="py-24 px-5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <span className="inline-block bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 animate-bounce">For Drivers</span>
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
              Drive when you want,<br />make what you need.
            </h2>
            <p className="text-gray-500 leading-relaxed mb-7">
              Flexible hours, fair pay, and a support team behind you every step. Your car, your schedule, your income.
            </p>
            <div className="space-y-3 mb-8">
              {["Flexible scheduling options", "Competitive earnings", "Easy-to-use app interface", "Supportive community"].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold flex items-center justify-center flex-shrink-0"><FaCheck/> </span>
                  <span className="text-sm text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
            <Link to="/rider-register">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition hover:-translate-y-0.5">
                Start driving today →
              </button>
            </Link>
          </FadeUp>
          <FadeUp delay={100}>
            <div className="rounded-3xl overflow-hidden shadow-xl aspect-[4/3] hover:scale-105 transition-transform">
              <img src="/mapSet.jpeg" alt="Driver map" className="w-full h-full object-cover" />
            </div>
          </FadeUp>
        </div>
      </section>

     
      <section className="py-24 px-5 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <div className="rounded-3xl overflow-hidden shadow-xl aspect-[4/3] hover:scale-105 transition-transform">
              <img src="/enjoyRides.jpeg" alt="Enjoy safe rides" className="w-full h-full object-cover" />
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <span className="inline-block bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 animate-bounce">Safety</span>
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
              Safety isn't a feature.<br />It's our foundation.
            </h2>
            <p className="text-gray-500 leading-relaxed mb-7">
              Every driver is vetted, every ride is tracked, and help is always one tap away.
            </p>
            <div className="space-y-3">
              {[
                "Thorough background checks on all drivers",
                "In-app emergency SOS for all users",
                "Live ride tracking enabled always",
                "Share your trip with trusted contacts",
              ].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold flex items-center justify-center flex-shrink-0"><FaCheck/> </span>
                  <span className="text-sm text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

     
      <section className="py-24 px-5">
        <FadeUp>
          <div className="max-w-6xl mx-auto bg-gray-900 rounded-3xl py-20 px-8 text-center flex flex-col items-center">
            <p className="text-5xl mb-4 text-center text-white"><FaCar /></p>
            <h2 className="text-4xl font-extrabold text-white tracking-tight mb-4">Ready to ride with PI?</h2>
            <p className="text-gray-400 leading-relaxed mb-10 max-w-sm mx-auto">
              Join thousands of riders and drivers who trust PI Rides every day.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/user-register">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-4 rounded-2xl transition hover:-translate-y-0.5">
                  Request a ride
                </button>
              </Link>
              <Link to="/rider-register">
                <button className="border-2 border-gray-700 hover:border-gray-500 text-white font-bold px-10 py-4 rounded-2xl transition hover:-translate-y-0.5">
                  Start driving
                </button>
              </Link>
            </div>
          </div>
        </FadeUp>
      </section>

    
      <footer className="bg-gray-950 text-white pt-16 pb-8 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-gray-800">
            <div>
              <img src="/pirides2.png" alt="PI Rides" className="h-8 mb-4" />
              <p className="text-sm text-gray-500 leading-relaxed max-w-[190px] mb-5">
                Safe, affordable rides for everyone.
              </p>
              <div className="flex gap-3">
                {[FaFacebook, FaTwitter, FaInstagram].map((Icon, i) => (
                  <div key={i} className="w-9 h-9 rounded-xl bg-gray-800 hover:bg-blue-600 flex items-center justify-center text-gray-400 hover:text-white transition cursor-pointer">
                    <Icon size={14} />
                  </div>
                ))}
              </div>
            </div>

            {[
              { title: "Company", links: [["About Us", "/about-us"], ["Careers", "/careers"], ["Blog", "/blog"], ["Press", "/press"]] },
              { title: "Support",  links: [["Help Center", "/help"], ["FAQ", "/faq"], ["Report Issue", "/report"], ["Contact Us", "/contact"]] },
              { title: "Legal",    links: [["Terms of Service", "/terms"], ["Privacy Policy", "/privacy"], ["Cookie Policy", "/cookies"]] },
            ].map(col => (
              <div key={col.title}>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">{col.title}</p>
                {col.links.map(([label, to]) => (
                  <Link key={label} to={to} className="block text-sm text-gray-500 hover:text-white mb-2.5 transition">{label}</Link>
                ))}
              </div>
            ))}
          </div>

          <div className="pt-6 flex flex-wrap justify-between gap-2 text-sm text-gray-600">
            <span>© 2024 PI Rides. All rights reserved.</span>
            <span>Made with ♥ in Bangladesh</span>
          </div>
        </div>
      </footer>

    </div>
  );
}