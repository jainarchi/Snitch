import { getWishlist, toggleProductInWishlist } from '../services/wishlist.api.js'
import { useDispatch } from 'react-redux'
import { setWishlist, removeFromWishlist , setLoading } from '../state/wishlist.slice.js'


export const useWishlist = () => {
    const dispatch = useDispatch()

    const handleGetWishlist = async () => {
        try {
            dispatch(setLoading(true))
            const data = await getWishlist()
            dispatch(setWishlist(data.wishlist))
            return { success: true, message: data.message }
        }
        catch (err) {
            return { success: false, message: err.response?.data?.message || "Something went wrong" }
        }
        finally {
            dispatch(setLoading( false))
        }
    }


    const handleToggleProductInWishlist = async (productId) => {
        try {
            dispatch(setLoading(true))
            const data = await toggleProductInWishlist(productId)
            return { success: true, message: data.message }
        } catch (err) {
            return { success: false, message: err.response?.data?.message || "Something went wrong" }
        }
        finally{
            dispatch(setLoading( false))
        }
    }

    const handleRemoveFromWishlist = async (productId) => {
      
        try {
            dispatch(setLoading(true))
            dispatch(removeFromWishlist(productId))
            const data = await toggleProductInWishlist(productId)
            return { success: true, message: data.message }
        } catch (err) {
            
            handleGetWishlist()
            return { success: false, message: err.response?.data?.message || "Something went wrong" }
        }
        finally{
            dispatch(setLoading( false))
        }
    }


    return {
        handleGetWishlist,
        handleToggleProductInWishlist,
        handleRemoveFromWishlist
    }

}
