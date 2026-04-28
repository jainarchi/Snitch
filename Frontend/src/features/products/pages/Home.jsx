import React , {useEffect} from 'react'
import {useProducts} from '../hook/useProducts.js'
import { useSelector , useDispatch} from 'react-redux'


const Home = () => {
  const dispatch = useDispatch()
  const {handleGetAllProducts , clearError } = useProducts()
  const loading = useSelector(state => state.products.loading.allProducts)
  const error = useSelector(state => state.products.error.allProducts)
  const allProducts = useSelector(state => state.products.allProducts)


   useEffect(() => {
      handleGetAllProducts()

      return () => {
        dispatch(clearError("allProducts"))
      }
    }, [])
  

    if(loading){
      return <h1>Loading...</h1>
    }
    if(error){
      return <h1>{error}</h1>
    }

    


  return (
    <div>
      {console.log(allProducts)}
      home - all products ui
    </div>
  )
}

export default Home
