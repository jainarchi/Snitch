import { getSellerSubOrders } from "../services/seller.api.js ";
import { setSellerSubOrders , setLoading } from "../services/seller.api.js";
import {dispatch} from 'react-redux'



export const useSeller = () => {

    const handleGetSellerSubOrders = async () => {
        try {
            dispatch(setLoading({type : 'subOrders' , value : true}))
            const data = await getSellerSubOrders()
            dispatch(setSellerSubOrders(data.orders))
            return {
                success: true,
                orders: data.orders
            }
        } catch (err) {
            return {
                success: false,
                message: err.response.data.message || "Something went wrong"
            }
        }finally{
            dispatch(setLoading({type : 'subOrders' , value : false}))
        }
    }







    return {
        handleGetSellerSubOrders

    }
}