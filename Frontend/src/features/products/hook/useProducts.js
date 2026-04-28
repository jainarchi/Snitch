import { createProducts, getAllProductsBySeller, getProductDetails, getAllProducts } from "../services/products.api.js"
import {
    setSellerProducts,
    addSellerProduct,
    setAllProducts,
    setLoading,
    setError,
    clearError,
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




    return {
        handleCreateProduct,
        handleGetAllProductsBySeller,
        handleGetProductDetails,
        handleGetAllProducts,
        clearError


    }
}