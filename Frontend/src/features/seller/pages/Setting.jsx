import React from 'react';
import { useSelector } from 'react-redux';
import PasswordSetting from '../../account/components/PasswordSetting';
import { useAccount } from '../../account/hook/useAccount';
import { toast } from 'react-toastify';

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




const Setting = () => {


  const SellerName = useSelector(state => state.auth.user.fullname)
  const SellerEmail = useSelector(state => state.auth.user.email)
  const { handleSetPassword, handleChangePassword } = useAccount()


  const onSetPassword = async (password) => {
    const res = await handleSetPassword(password)
    if (res.success) {
      toast.success(res.message)
    }
    else {
      toast.error(res.message)
    }


  }

  const onChangePassword = async (currentPassword, newPassword) => {
    
    const res = await handleChangePassword({currentPassword, newPassword});
    if (res.success) {
      toast.success(res.message);
    }
    else {
      toast.error(res.message);
    }

  }



  return (
    <div className="flex flex-col flex-1 min-h-screen bg-snitch-cream">


      <main className="flex-1 overflow-y-auto px-6 md:px-10 pb-24">


        <div className="pt-10 pb-8 border-b border-snitch-border/20 mb-2">
          <p className="font-label text-[0.6rem] tracking-[0.18em] uppercase text-snitch-warm m-0 mb-3">
            Account Management
          </p>
          <h1 className="font-serif text-[2.2rem] md:text-[2.8rem] font-normal text-snitch-charcoal m-0 leading-[1.15]">
            The Silent<br />Curator's Workspace.
          </h1>
        </div>



        <div className="flex flex-col md:flex-row gap-8 md:gap-12 pt-10 pb-16 border-b border-snitch-border/20">

          <div className="md:w-[200px] shrink-0">
            <h2 className="font-serif text-[1.2rem] font-normal text-snitch-charcoal m-0 mb-2 leading-snug">
              Profile<br />Information
            </h2>
            <p className="font-body text-[0.75rem] text-snitch-muted m-0 leading-relaxed">
              Your public and administrative identity.
            </p>
          </div>
          {/* Right: content */}
          <div className="flex-1 max-w-lg">
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
          </div>


          </div >



          <PasswordSetting
            onSetPassword={onSetPassword}
            onChangePassword={onChangePassword}
          />





      </main>



    </div>
  );
};

export default Setting;
