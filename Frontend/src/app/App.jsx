import React , {Suspense, useEffect} from 'react'
import { appRouter } from './app.routes'
import { RouterProvider } from 'react-router-dom'
import { useAuth } from '../features/auth/hook/useAuth'
import { ToastContainer } from "react-toastify";
import Loading from '../features/shared/Loading';
import {useWishlist} from '../features/wishlist/hook/useWishlist'



const App = () => {
 const {handleGetMe } = useAuth()
 const {handleGetWishlist} = useWishlist()

  useEffect(() => {

    const init = async () =>{
      const res = await handleGetMe()
      if(res?.user?.role === 'buyer'){
        await handleGetWishlist()
      }
    }
    
    init()

  }, []);



  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
           <RouterProvider router={appRouter} />
      </Suspense> 




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
