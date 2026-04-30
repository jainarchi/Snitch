import { createProducts, getAllProductsBySeller, getProductDetails, getAllProducts , deleteProduct , addProductVariant } from "../services/products.api.js"
import {
    setSellerProducts,
    addSellerProduct,
    setAllProducts,
    setLoading,
    setError,
    clearError,
    removeProduct
} from "../state/products.slice.js"
import { useDispatch } from "react-redux"


export const useProducts = () => {
    const dispatch = useDispatch()


    const handleCreateProduct = async (formData) => {
        const data = await createProducts(formData)
        dispatch(addSellerProduct(data.product))
        return data.product
    }


    const handleGetAllProductsBySeller = async () => {
        const data = await getAllProductsBySeller()
        dispatch(setSellerProducts(data.products))
    }


    const handleGetProductDetails = async (productId) => {
        const data = await getProductDetails(productId)
        return data.product
    }



    // get all products to show on home page

    const handleGetAllProducts = async () => {
        dispatch(setLoading({ key: "allProducts", value: true }))

        try {
            const data = await getAllProducts()
            dispatch(setAllProducts(data.products))
        } catch (err) {
            console.log(err.message)
            dispatch(setError({ key: "allProducts", value: err?.response?.message || "Something went wrong" }))
        } finally {
            dispatch(setLoading({ key: "allProducts", value: false }))
        }
    }

// pessimistic update 
    const handleDeleteProduct = async (productId) =>{

        try{
          const data = await deleteProduct(productId)
          console.log(data.message)
          dispatch(removeProduct(productId))

        }
        catch(err){
            console.log(err)
        }
    }


    const handleAddProductVariant = async (productId , formData) => {
        try{
            const data = await addProductVariant(productId , formData)
            console.log(data.product)

        }catch(err){
            console.log(err)

        }
    }
    



    return {
        handleCreateProduct,
        handleGetAllProductsBySeller,
        handleGetProductDetails,
        handleGetAllProducts,
        clearError,
        handleDeleteProduct,
        handleAddProductVariant


    }
}