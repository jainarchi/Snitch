import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Field = ({ label, id, type = 'text', value, onChange, placeholder = '' }) => (
  <div className="flex flex-col gap-1">
    <label
      htmlFor={id}
      className="font-label text-[0.6rem] tracking-[0.14em] uppercase text-snitch-warm"
    >
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="
        bg-transparent border-0 border-b border-snitch-border
        focus:border-snitch-gold outline-none
        font-body text-[0.9rem] text-snitch-charcoal placeholder:text-snitch-faint
        py-2 transition-colors duration-300 w-full
      "
    />
  </div>
);

/** Section row — left description, right content (matches screenshot two-column) */
const SectionRow = ({ title, description, children }) => (
  <div className="flex flex-col md:flex-row gap-8 md:gap-12 py-12 border-b border-snitch-border/20">
    {/* Left: label + description */}
    <div className="md:w-[200px] shrink-0">
      <h2 className="font-serif text-[1.1rem] italic font-normal text-snitch-charcoal m-0 mb-2 leading-snug">
        {title}
      </h2>
      <p className="font-body text-[0.75rem] text-snitch-muted m-0 leading-relaxed">
        {description}
      </p>
    </div>
    {/* Right: content */}
    <div className="flex-1 max-w-lg">
      {children}
    </div>
  </div>
);

/*   Setting Page  */
  const Setting = () => {
  const navigate = useNavigate();

  const SellerName = useSelector(state => state.auth.user.fullname)
  const SellerEmail = useSelector(state => state.auth.user.email)


  const [newPass, setNewPass]       = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const [saved, setSaved] = useState(false);

  const handleSaveAll = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-snitch-cream">

      {/*    TOP BAR    */}
      {/* <header className="flex items-center justify-between px-6 md:px-10 py-4 border-b border-snitch-border/20 bg-snitch-cream sticky top-0 z-20">
        
        <p className="font-serif text-[0.95rem] italic text-snitch-charcoal m-0 pl-8 lg:pl-0">
          Settings.
        </p>

        <div className="flex items-center gap-5">
        
          <button className="bg-transparent border-none p-0 cursor-pointer text-snitch-warm hover:text-snitch-gold transition-colors duration-300">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          </button>
          <button className="bg-transparent border-none p-0 cursor-pointer text-snitch-warm hover:text-snitch-gold transition-colors duration-300">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </button>
         
          <div className="w-7 h-7 bg-snitch-gold flex items-center justify-center">
            <span className="font-label text-[0.6rem] font-bold text-white">JT</span>
          </div>
        </div>
      </header> */}

      {/* main setting content    */}
      <main className="flex-1 overflow-y-auto px-6 md:px-10 pb-24">

        {/*  Hero heading  */}
        <div className="pt-10 pb-8 border-b border-snitch-border/20 mb-2">
          <p className="font-label text-[0.6rem] tracking-[0.18em] uppercase text-snitch-warm m-0 mb-3">
            Account Management
          </p>
          <h1 className="font-serif text-[2.2rem] md:text-[2.8rem] font-normal text-snitch-charcoal m-0 leading-[1.15]">
            The Silent<br />Curator's Workspace.
          </h1>
        </div>

        {/* ══ SECTION 1 — Profile Information ══ */}
        <SectionRow
          title={<>Profile<br/>Information</>}
          description="Your public and administrative identity."
        >
          <div className="flex flex-col gap-7">
             <div className='border-b border-gray-400 pb-2'>
           
            <h3>Name</h3>
            <p className='text-gray-400'>{SellerName}</p>
            </div>
           
           
           <div className='border-b border-gray-400 pb-2'>
           
            <h3>Email</h3>
            <p className='text-gray-400'>{SellerEmail}</p>
            </div>
          </div>
        </SectionRow>

        {/* ══ SECTION 2 — Payment & Payouts ══ */}
        <SectionRow
          title={<>Payment &amp;<br/>Payouts</>}
          description="Manage the flow of capital through your storefront."
        >
          {/* Payment card — tonal box */}
          <div className="bg-snitch-card/50 p-5 border border-snitch-border/25">
            <div className="flex items-center justify-between mb-4">
              <p className="font-label text-[0.6rem] tracking-[0.14em] uppercase text-snitch-warm m-0">
                Current Method
              </p>
              <button className="font-label text-[0.6rem] tracking-[0.12em] uppercase text-snitch-gold underline decoration-transparent hover:decoration-snitch-gold bg-transparent border-none p-0 cursor-pointer transition-all duration-300">
                Edit Method
              </button>
            </div>

            <p className="font-serif text-[1.05rem] text-snitch-charcoal m-0 mb-5">
              Standard Chartered •••• 9902
            </p>

            <div className="flex flex-col gap-2 border-t border-snitch-border/20 pt-4">
              <div className="flex justify-between items-center">
                <span className="font-label text-[0.65rem] tracking-[0.08em] text-snitch-warm">Payout Schedule</span>
                <span className="font-body text-[0.8rem] text-snitch-charcoal">Monthly, 1st Day</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-label text-[0.65rem] tracking-[0.08em] text-snitch-warm">Processing Currency</span>
                <span className="font-body text-[0.8rem] text-snitch-charcoal">USD ($)</span>
              </div>
            </div>
          </div>
        </SectionRow>

        {/* ══ SECTION 3 — Security Integrity ══ */}
        <SectionRow
          title={<>Security<br/>Integrity</>}
          description="Protect your digital assets with high-level encryption."
        >
          <div className="flex flex-col gap-6">
            {/* Add credentials note */}
            <div>
              <p className="font-label text-[0.6rem] tracking-[0.14em] uppercase text-snitch-warm m-0 mb-2">
                Add Manual Credentials
              </p>
              <p className="font-body text-[0.78rem] text-snitch-muted m-0 leading-relaxed">
                If you joined via Google, you can set a unique password here to enable traditional email &amp; password login for your account.
              </p>
            </div>

            <Field
              id="newPass"
              label="New Password"
              type="password"
              value={newPass}
              onChange={e => setNewPass(e.target.value)}
              placeholder="••••••••••••"
            />
            <Field
              id="confirmPass"
              label="Confirm New Password"
              type="password"
              value={confirmPass}
              onChange={e => setConfirmPass(e.target.value)}
              placeholder="••••••••••••"
            />

            {/* CTA */}
            <div>
              <button className="
                font-label text-[0.7rem] tracking-[0.14em] uppercase
                bg-snitch-gold text-white
                px-8 py-3.5 border-0 cursor-pointer
                hover:bg-snitch-charcoal transition-all duration-300
              ">
                Set Password
              </button>
              <p className="font-body text-[0.7rem] text-snitch-faint m-0 mt-3">
                Setting a password will not disable your existing social login methods.
              </p>
            </div>
          </div>
        </SectionRow>

      </main>

      {/* ══════════════ STICKY FOOTER BAR ══════════════ */}
      <footer className="
        fixed bottom-0 left-0 right-0 z-30
        flex items-center justify-between
        px-6 md:px-10 py-3.5
        bg-snitch-cream border-t border-snitch-border/30
      ">
        {/* Last sync */}
        <p className="font-label text-[0.6rem] tracking-[0.06em] text-snitch-faint m-0 hidden sm:block">
          Last sync: Today at 09:43 AM Paris/Paris, PT
        </p>

        {/* Actions */}
        <div className="flex items-center gap-6 ml-auto">
          {saved && (
            <span className="font-label text-[0.65rem] tracking-[0.08em] uppercase text-snitch-gold animate-pulse">
              ✓ All Changes Saved
            </span>
          )}
          <button
            onClick={handleSaveAll}
            className="font-label text-[0.65rem] tracking-[0.12em] uppercase text-snitch-charcoal bg-transparent border-none p-0 cursor-pointer hover:text-snitch-gold transition-colors duration-300"
          >
            Save All Changes
          </button>
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-1.5 font-label text-[0.65rem] tracking-[0.12em] uppercase text-snitch-gold bg-transparent border-none p-0 cursor-pointer hover:text-snitch-charcoal transition-colors duration-300"
          >
             Logout Session
          </button>
        </div>
      </footer>

    </div>
  );
};

export default Setting;
