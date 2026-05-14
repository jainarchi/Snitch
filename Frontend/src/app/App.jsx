import React , {useEffect} from 'react'
import { appRouter } from './app.routes'
import { RouterProvider } from 'react-router-dom'
import { useAuth } from '../features/auth/hook/useAuth'
import { ToastContainer } from "react-toastify";

const App = () => {
 const {handleGetMe} = useAuth()

  useEffect(() => {
    handleGetMe();
  }, []);




  return (
    <>

      <RouterProvider router={appRouter} />





      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />


    </>
  )
}

export default App
