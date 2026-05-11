import React from 'react'
import { useLocation } from 'react-router-dom'




const OrderSuccess = () => {

   const location = useLocation()

   const queryParams = new URLSearchParams(location.search)

   const order_id = queryParams.get('order_id')
      

  return (
    <div>
        order success
        <p>order id: {order_id}</p>
      
    </div>
  )
}

export default OrderSuccess
