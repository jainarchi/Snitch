import { getOrderDetails, getUserOrders } from "../services/order.api";




export const useOrder = () => {



    const handleGetUserOrders = async () => {
        try {
            const data = await getUserOrders()
            return {
                success: true,
                orders: data.orders
            }
        } catch (err) {
            return {
                success: false,
                message: err.response.data.message || "Something went wrong"
            }
        }
    }


    const handleGetOrderDetails = async (orderId) => {
        try {
            const data = await getOrderDetails(orderId)
            return {
                success: true,
                order: data.order
            }
        } catch (err) {
            return {
                success: false,
                message: err.response.data.message || "Something went wrong"
            }
        }
    }




    return {
        handleGetUserOrders,
        handleGetOrderDetails

    }
}