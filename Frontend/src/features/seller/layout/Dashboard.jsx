import React from 'react'
import Sidebar from '../components/Sidebar.jsx'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div className='h-full w-full flex '>

        <Sidebar/>
       

      <div className='flex-1' >
        <Outlet/>
        
      </div>

      
    </div>
  )
}

export default DashboardLayout
