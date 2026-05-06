import { addToCart, getCartItems, removeItemFromCart, incrementCartItemQuantity, decrementCartItemQuantity } from "../services/cart.api";

import { setItems, removeItem, incrementItemQuantity, decrementItemQuantity } from "../state/cart.slice";
import { useDispatch } from "react-redux";




export const useCart = () => {
  const dispatch = useDispatch()



  const handleGetCartItems = async () => {
   try{
    const data = await getCartItems()
    dispatch(setItems(data.cartItems))
    console.log(data.message)
   }
    catch(err){
      console.log(err)
    }

  }



  const handleAddToCart = async (productId, variantId, quantity) => {
    try{

    const data = await addToCart({ productId, variantId, quantity })
    console.log(data.message)

    }catch(err){
      console.log(err)
    }

  }

  const handleRemoveItem = async (itemId) => {

    try{
      const data = await removeItemFromCart(itemId)
      dispatch(removeItem(itemId))
      console.log(data.message)
    }catch(err){
      console.log(err)
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





  return {
    handleGetCartItems,
    handleAddToCart,
    handleRemoveItem,
    handleIncrementCartItemQuantity,
    handleDecrementCartItemQuantity

  }


}