import React from 'react'
import { Navigate } from 'react'
import {useSelector} from 'react-redux'


const Protected = (children , role ='buyer') => {
 
    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.auth.loading)


     if(loading){
      return <h1>Loading...</h1>
     }


     if( !user){
        <Navigate to="/login" />
     }

     
     if(user.role !== role){
       < Navigate to="/"  />
     }


     return children

}

export default Protected
