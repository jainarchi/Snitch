import React from 'react'
import { appRouter } from './app.routes'
import { RouterProvider } from 'react-router-dom'

const App = () => {


  return (
    <>

      <RouterProvider router={appRouter} />
      
     
    </>
  )
}

export default App
