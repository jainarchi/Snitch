import React , {useEffect , useState} from 'react'
import { useParams } from 'react-router-dom'
import { useProducts } from '../hook/useProducts'

const ProductDetails = () => {
    const {productId} = useParams()
    const {handleGetProductDetails} = useProducts()

    const [product, setProduct] = useState(null)


    const fetchProductDetails = async () =>{
        const data = await handleGetProductDetails(productId)
        setProduct(data.product)
    }

    useEffect(() => {
      fetchProductDetails()
    
    }, [])
    
   console.log(product)

  return (
    <div>
        product details
      
    </div>
  )
}

export default ProductDetails
