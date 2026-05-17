import React , {useEffect } from 'react'
import {useSeller } from '../hook/useSeller'
import Loading from '../../shared/Loading'
import {useSelector } from 'react-redux'




const Order = () => {
  const {handleGetSellerSubOrders} = useSeller()
  const subOrders = useSelector(state => state.seller.subOrders)
  const loading = useSelector(state => state.seller.loading.subOrders)


  useEffect(() => {
    handleGetSellerSubOrders()

  }, [])



  if(loading){
    return (
      <Loading />
    )
  }



  return (
    <div>
      
       
    </div>
  )
}

export default Order
