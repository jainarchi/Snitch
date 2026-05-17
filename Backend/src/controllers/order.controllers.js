import orderModel from "../models/order.model.js"



const orderConfirmed = async (req, res) => {

    const { orderId } = req.params
    console.log(orderId)

    try {
        const order = await orderModel.findOne({
            _id: orderId,
            user: req.user.id
        }).select('deliveryAddress price createdAt').lean()


        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            })
        }

        order.status = 'Confirmed'

        res.status(200).json({
            success: true,
            order
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}




const getOrders = async (req, res) => {

    const userId = req.user.id

    try {
        const orders = await orderModel.find({
            user: userId,
        })
            .populate('subOrders', 'items status')
            .select('_id price createdAt')
            .lean();

        const formattedOrders = orders.map(order => {

            // all items from all suborders
            const allItems = order.subOrders.flatMap(subOrder => subOrder.items);


            const itemsCount = allItems.reduce((sum, item) => {
                return sum + item.quantity;
            }, 0);


            const previewImage = allItems[0]?.image?.url || null;


            const statuses = order.subOrders.map(sub => sub.status);

            let status = "processing";

            if (statuses.every(s => s === "delivered")) {
                status = "delivered";
            }
            else if (statuses.some(s => s === "shipped")) {
                status = "shipped";
            }
            else if (statuses.every(s => s === "confirmed")) {
                status = "confirmed";
            }

            return {
                _id: order._id,
                createdAt: order.createdAt,
                price: order.price,
                itemsCount,
                previewImage,
                status
            };
        });

        res.status(200).json({
            success: true,
            orders: formattedOrders
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}




const getOrderDetails = async (req, res) => {
    const { orderId } = req.params
    try {

        const order = await orderModel.findOne({
            user: req.user.id,
            _id: orderId
        }).populate('payment', '-_id status totalPrice razorpay.orderId')
            .populate('subOrders', 'items status -_id')
            .select('-user -__v -_id -updatedAt')
            .lean()


        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            })
        }

        res.status(200).json({
            success: true,
            order
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }





}


export {
    getOrders,
    getOrderDetails,
    orderConfirmed
}