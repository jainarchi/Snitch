import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import {useAuth} from '../hook/useAuth.js'
import ContinueWithGoogleButton from '../components/ContinueWithGoogleButton.jsx';



const Register = () => {

   const {handleRegister} = useAuth()
   const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    contact: '',
    password: '',
    isSeller: false,
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id === 'seller' ? 'isSeller' : id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     
    await handleRegister(formData)
    navigate('/' ,  {replace: true})

    console.log('Form Submitted', formData)
  }

  
  return (
    <div className="bg-background text-on-background font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen w-full relative sm:h-screen sm:overflow-hidden">
      
      {/* Background Aesthetic Texture */}
      <div className="absolute inset-0 z-0 opacity-20 grayscale pointer-events-none">
        <img 
          alt="High-end fashion photography detail" 
          className="w-full h-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCM1-nZNrGnDmm6u46iMDbib9pU70hCTx5ixBIzkShGZTPsE0fMUkb1j2MZSY7Xyo1oYdSzNh_7Kk5HLNbSidVooPr23puCePDWLWRG9gJjJT4hyGeOLxVRXfrRB1UdpROE42-hFfPddo34y_iPyYjJ7CwLe9R7dks9AOw77fqgQ-7Yx8MMdxT66H6vjvrjgsq6c784tiL7_JaMB34AVakpHcQApcj3dlaYZ3TvNHgRIqjb1RnS8FDJrSVBs1lIQUdyPlRYqR8DyTrm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
      </div>

      <main className="relative z-10 w-full min-h-screen sm:h-full max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20 py-10 sm:py-0">
        
        {/* Left Side: Typography */}
        <div className="flex flex-col flex-1 mb-6 md:mb-0 text-center md:text-left pt-6 sm:pt-0">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-[5rem] leading-tight md:leading-[0.9] font-bold tracking-tighter text-on-background mb-4 md:mb-8">
            WELCOME TO<br />
            <span className="text-primary-container">STITCH.</span>
          </h1>
          <p className="font-body text-stone-400 md:max-w-md text-sm md:text-lg leading-relaxed mx-auto md:mx-0">
            Discover the latest in modern apparel curated seamlessly for your everyday life.
          </p>
          <div className="mt-8 md:mt-12 flex flex-col md:flex-row items-center gap-4 mx-auto md:mx-0">
            <div className="h-px w-24 bg-outline-variant/40 hidden md:block"></div>
            <span className="font-label text-xs md:text-[10px] tracking-[0.2em] text-stone-500 uppercase">PREMIUM CLOTHING</span>
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="w-full max-w-lg bg-surface-container-low/60 backdrop-blur-3xl p-4 sm:p-10 md:p-8 rounded-2xl sm:rounded-lg shadow-2xl mb-10 sm:mb-0 ">
          <div className="mb-10">
            <h2 className="font-headline text-xl font-bold  mb-2 text-gray-50">CREATE ACCOUNT</h2>
            <p className="font-body text-sm text-stone-500">Enter your credentials to enter the store.</p>
          </div>
          
          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="relative mt-2">
              <input 
                className="peer block w-full bg-transparent border-0 border-b border-outline-variant/30 py-2 px-1 focus:ring-0 focus:border-primary-container text-on-surface placeholder-transparent transition-all" 
                id="fullname" 
                placeholder=" " 
                type="text"
                value={formData.fullname}
                onChange={handleChange}
                required
              />
              <label 
                className="absolute left-1 -top-4 text-stone-500 text-xs uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-primary-container peer-focus:text-xs" 
                htmlFor="fullname"
              >
                Full Name
              </label>
            </div>
            
            {/* Email */}
            <div className="relative mt-2">
              <input 
                className="peer block w-full bg-transparent border-0 border-b border-outline-variant/30 py-2 px-1 focus:ring-0 focus:border-primary-container text-on-surface placeholder-transparent transition-all" 
                id="email" 
                placeholder=" " 
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label 
                className="absolute left-1 -top-4 text-stone-500 text-xs uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-primary-container peer-focus:text-xs" 
                htmlFor="email"
              >
                Email Address
              </label>
            </div>
            
            {/* Contact */}
            <div className="relative mt-2">
              <input 
                className="peer block w-full bg-transparent border-0 border-b border-outline-variant/30 py-2 px-1 focus:ring-0 focus:border-primary-container text-on-surface placeholder-transparent transition-all" 
                id="contact" 
                placeholder=" " 
                type="tel"
                value={formData.contact}
                onChange={handleChange}
                required
              />
              <label 
                className="absolute left-1 -top-4 text-stone-500 text-xs uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-primary-container peer-focus:text-xs" 
                htmlFor="contact"
              >
                Contact Number
              </label>
            </div>
            
            {/* Password */}
            <div className="relative mt-2">
              <input 
                className="peer block w-full bg-transparent border-0 border-b border-outline-variant/30 py-2 px-1 focus:ring-0 focus:border-primary-container text-on-surface placeholder-transparent transition-all" 
                id="password" 
                placeholder=" " 
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <label 
                className="absolute left-1 -top-4 text-stone-500 text-xs uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-primary-container peer-focus:text-xs" 
                htmlFor="password"
              >
                Password
              </label>
            </div>
            
            {/* Seller Checkbox */}
            <div className="flex items-center gap-3 pt-4">
              <div className="relative flex items-center">
                <input 
                  className="w-5 h-5 rounded-sm bg-surface-container-highest border-outline-variant text-primary-container focus:ring-primary-container/20 focus:ring-offset-0 ring-offset-background transition-colors cursor-pointer" 
                  id="seller" 
                  type="checkbox"
                  checked={formData.isSeller}
                  onChange={handleChange}
                />
              </div>
              <label className="font-body text-xs tracking-wide text-on-surface-variant cursor-pointer uppercase select-none" htmlFor="seller">
                Are you a Seller?
              </label>
            </div>
            
            {/* Register Button */}
            <div className="pt-6">
              <button 
                className="w-full bg-gradient-to-r from-primary-fixed-dim to-primary-container text-on-primary font-headline font-bold py-2 sm:py-2 rounded-md uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all flex justify-center items-center gap-2 group cursor-pointer" 
                type="submit"
              >
                <span>Register</span>
                <span className="text-xl transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>


             {/* Continue with Google Button */}
             <ContinueWithGoogleButton />
            
            <div className="pt-4 text-center">
              <p className="font-body text-[10px] text-stone-500 tracking-wider uppercase">
                Already have an account? <a className="text-primary-container hover:underline ml-1" href="/login">Login</a>
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Register;
