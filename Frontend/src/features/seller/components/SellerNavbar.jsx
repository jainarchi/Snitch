import React from 'react'
import { useNavigate } from 'react-router-dom'
import Icons from '../../shared/icons/Icons'
import { useSelector } from 'react-redux'
import {profileLogo} from '../../shared/utils/profileLogo'
import { useLocation } from 'react-router-dom'

const SellerNavbar = () => {
  const navigate = useNavigate()
  const seller = useSelector(state => state.auth.user)
  const location = useLocation()


  const PAGE_NAMES = {
  overview: 'Overview',
  products: 'Products',
  orders: 'Orders',
  settings: 'Settings',
  'create-product': 'Add Product',
}
  

    // Extract last segment: /seller/dashboard/overview → "overview"
  const segment = location.pathname.split('/').filter(Boolean).pop()
  const pageTitle = PAGE_NAMES[segment] || 'Dashboard'

  return (
    <>

     <nav className="flex items-center justify-between px-6 md:px-10 py-4 border-b border-snitch-border/20 bg-snitch-cream sticky top-0 z-20">
        
        <p className="font-light text-[0.8rem] tracking-[0.09em] uppercase  text-snitch-charcoal m-0 pl-10 lg:pl-0">
          {pageTitle}
        </p>

        <div className="flex items-center gap-2">
          
           <h3>{seller?.fullname}</h3>

          <div className="w-7 h-7 bg-snitch-gold flex items-center justify-center">
            <span className="font-label text-[0.8rem] font-semibold text-white">
              {profileLogo(seller?.fullname)}
            </span>
          </div>
        </div>
      </nav> 



      
    </>
  )
}

export default SellerNavbar
