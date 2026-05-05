import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../features/shared/navbar/Nabvar'
import Footer from '../features/shared/Footer'
import SellerNavbar from '../features/shared/navbar/SellerNavbar'
import { useSelector } from 'react-redux'

const AppLayout = () => {
    const user = useSelector(state => state.auth.user)



  return (
    <div>
       {
        user?.role === 'seller' ? <SellerNavbar /> : <Navbar />
       }

        <main className='min-h-[100vh]'>
          <Outlet />
        </main>

        <Footer />

      
    </div>
  )
}

export default AppLayout
