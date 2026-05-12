import orderModel from "../models/order.model.js"


const getOrders = async (req, res) => {

    const userId = req.user.id

    try {
        const orders = await orderModel.find({
            user: userId,
        }).populate('subOrders', 'items status -_id')
            .populate('payment', 'razorpay.paymentId razorpay.orderId -_id')
            .select('-user -__v')
            .lean()


        res.status(200).json({
            success: true,
            orders
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })

    }


}


export {
    getOrders
}