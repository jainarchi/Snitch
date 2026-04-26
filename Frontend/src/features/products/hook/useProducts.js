import { createProducts, getAllProductsBySeller } from "../services/products.api.js"
import { setSellerProducts , addSellerProduct  } from "../state/products.slice.js"
import { useDispatch } from "react-redux"


export const useProducts = () => {
    const dispatch = useDispatch()


    const handleCreateProduct = async (formData) => {
        const data = await createProducts(formData)
        dispatch(addSellerProduct(data.product))
        return data.product
    }


    const handleGetAllProductsBySeller = async () =>{
        const data = await getAllProductsBySeller()
        dispatch(setSellerProducts(data.products)) 
    }





    return {
        handleCreateProduct,
        handleGetAllProductsBySeller,
    }
}