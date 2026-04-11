import React, { useState } from 'react';
import { useAuth } from '../hook/useAuth';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const {handleLogin} = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(formData)
    navigate('/' ,  {replace: true})
    console.log('Login Submitted', formData);
  };




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
          <h1 className="font-headline text-4xl md:text-6xl lg:text-[5rem] leading-tight md:leading-[0.9] font-extrabold tracking-tighter text-on-background mb-4 md:mb-8">
            WELCOME BACK,<br />
            <span className="text-primary-container">STITCH.</span>
          </h1>
          <p className="font-body text-stone-400 md:max-w-md text-sm md:text-lg leading-relaxed mx-auto md:mx-0">
            Sign in to access your curated selections, track your latest orders, and continue your journey with us.
          </p>
          <div className="mt-8 md:mt-12 flex flex-col md:flex-row items-center gap-4 mx-auto md:mx-0">
            <div className="h-px w-24 bg-outline-variant/40 hidden md:block"></div>
            <span className="font-label text-xs md:text-[10px] tracking-[0.2em] text-stone-500 uppercase">PREMIUM CLOTHING</span>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full max-w-lg bg-surface-container-low/60 backdrop-blur-3xl p-7 sm:p-10 md:p-14 rounded-2xl sm:rounded-lg shadow-2xl mb-10 sm:mb-0">
          <div className="mb-10">
            <h2 className="font-headline text-3xl font-bold tracking-tight mb-2">SIGN IN</h2>
            <p className="font-body text-sm text-stone-500">Enter your credentials to enter the store.</p>
          </div>
          
          <form className="space-y-8" onSubmit={handleSubmit}>
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
            
            {/* Login Button */}
            <div className="pt-6">
              <button 
                className="w-full bg-gradient-to-r from-primary-fixed-dim to-primary-container text-on-primary font-headline font-extrabold py-3 sm:py-3 rounded-full uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all flex justify-center items-center gap-2 group cursor-pointer" 
                type="submit"
              >
                <span>Login</span>
                <span className="text-xl transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>
            
            <div className="pt-4 text-center">
              <p className="font-body text-[10px] text-stone-500 tracking-wider uppercase">
                Don't have an account? <a className="text-primary-container hover:underline ml-1" href="/register">Register</a>
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
