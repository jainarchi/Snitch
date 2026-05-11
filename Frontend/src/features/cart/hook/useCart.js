import { addToCart, 
  getCartItems, 
  removeItemFromCart, 
  incrementCartItemQuantity, 
  decrementCartItemQuantity , 
  createCartOrder,
  verifyCartOrder 
} from "../services/cart.api";

import { setItems, removeItem, incrementItemQuantity, decrementItemQuantity , setLoading } from "../state/cart.slice";
import { useDispatch } from "react-redux";




export const useCart = () => {
  const dispatch = useDispatch()



  const handleGetCart = async () => {
   try{
    dispatch(setLoading(true))
    const data = await getCartItems()
    dispatch(setItems(data.cart))
   }
    catch(err){
      console.log(err)
    }
    finally{
      dispatch(setLoading(false))
    }

  }



  const handleAddToCart = async (productId, variantId, quantity) => {
    try{
    const data = await addToCart({ productId, variantId, quantity })
    return { success: true, message: data.message }

    } catch(err){
     return { success: false, message: err.response.data.message || "Something went wrong" }
    }

  }

  
  const handleRemoveItem = async (itemId) => {

    try{
      dispatch(setLoading(true))
      const data = await removeItemFromCart(itemId)
      dispatch(removeItem(itemId))
      console.log(data.message)
    }catch(err){
      console.log(err)
    }
    finally{
      dispatch(setLoading(false))
    }
    
  }



  const handleIncrementCartItemQuantity = async (itemId) => {
    try {
     const data = await incrementCartItemQuantity(itemId)
      dispatch(incrementItemQuantity(itemId))
      return {success : true , message : data.message}
    } catch (err) {
      return {success : false , message : err.response.data.message || "Something went wrong"}
    }


  }


  const handleDecrementCartItemQuantity = async (itemId) => {

    try {
       const data =await decrementCartItemQuantity(itemId)
      dispatch(decrementItemQuantity(itemId))
      return {success : true , message : data.message}
    } catch (err) {
      return {success : false , message : err.response.data.message || "Something went wrong"}
    }

  }



  const handleCreateCartOrder = async () =>{
    try{
      const data = await createCartOrder()
      console.log(data.message)
      return { success : true , message : data.message,  paymentOrder :data.paymentOrder}

    }catch(err){
      console.log(err)
      return {
        success : false,
        message : err.response.data.message || "Something went wrong"
    }
    }
  }


  const handleVerifyCartOrder = async ({
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
  }) => {
    try {
      
      const data = await verifyCartOrder({
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
      })
      
      console.log(data.message)
      return { success: true, message: data.message }

    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: err.response.data.message || "Something went wrong",
      };
    }


  return {
    handleGetCart,
    handleAddToCart,
    handleRemoveItem,
    handleIncrementCartItemQuantity,
    handleDecrementCartItemQuantity,
    handleCreateCartOrder

  }


}