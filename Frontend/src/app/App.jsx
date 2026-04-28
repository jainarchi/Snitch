import React from 'react'
import { appRouter } from './app.routes'
import { RouterProvider } from 'react-router-dom'
import { useAuth } from '../features/auth/hook/useAuth'

const App = () => {
    useAuth()

  return (
    <>

      <RouterProvider router={appRouter} />
      
     
    </>
  )
}

export default App
