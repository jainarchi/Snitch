import {getWishlist } from '../services/wishlist.api.js'
import {useDispatch} from 'react-redux'
import {setWishlist , toggleProductInWishlist  } from '../state/wishlist.slice.js'


export const useWishlist = () =>{
    const dispatch = useDispatch()
    

    const handleGetWishlist = async () =>{
        try{
            const data = await getWishlist('/')
            dispatch(setWishlist(data.wishlist))
            return {success : true , message : data.message}
        }
        catch(err){
            return {success : false , message : err.response.data.message || "Something went wrong"}
        }
        
    }


    const handleToggleProductInWishlist = async (productId) => {
        try {
            const data = await toggleProductInWishlist(productId)
            return {success : true , message : data.message}
        } catch (err) {
            return {success : false , message : err.response.data.message || "Something went wrong"}
        }
    }


    return {
        handleGetWishlist,
        handleToggleProductInWishlist

    }

}
