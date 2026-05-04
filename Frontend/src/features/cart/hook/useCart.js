import { addToCart , getCartItems , removeItemFromCart } from "../services/cart.api";

import { setItems ,  removeItem } from "../state/cart.slice";
import {useDispatch} from "react-redux";




export const useCart = () =>{
    const dispatch = useDispatch()

  const handleGetCartItems = async () =>{

    const data = await getCartItems()
    dispatch(setItems(data.cartItems))
    console.log(data.message)

  }



  const handleAddToCart = async (productId , variantId , quantity) =>{

    const data = await addToCart({productId , variantId , quantity})
    console.log(data.message)

  }

  const handleRemoveItem = async (itemId) =>{
      const data = await removeItemFromCart(itemId)
      dispatch(removeItem(itemId))
      console.log(data.message)

  }







  return {
    handleGetCartItems,
    handleAddToCart,
    handleRemoveItem
  }


}