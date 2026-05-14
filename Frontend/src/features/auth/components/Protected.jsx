import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loading from '../../shared/Loading.jsx'
import { useWishlist } from '../../wishlist/hook/useWishlist.js'

const Protected = ({ children, role = 'buyer' }) => {

  const user = useSelector(state => state.auth.user)
  const loading = useSelector(state => state.auth.loading)
  const { handleGetWishlist } = useWishlist()


// fetch to set wishlist to make a set of ids
  // useEffect(() => {
  //   if (user?.role === "buyer") {
  //     handleGetWishlist()
  //   }
  // }, [user])



  console.log(user, loading)


  if (loading) {
    return <Loading />
  }


  if (!user) {
    return <Navigate to="/login" replace />
  }

  console.log(user)

  if (user.role !== role) {
    return <Navigate to="/" replace />
  }



  return children

}

export default Protected
