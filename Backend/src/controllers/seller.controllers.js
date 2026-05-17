import subOrderModel from "../models/subOrder.model.js";




const getSellerSubOrders = async (req, res) => {

    const sellerId = req.seller.id;

    try {

        const orders = await subOrderModel.find({ seller: sellerId })
        .populate('user' , 'fullname email -_id')
        .populate('order' , 'deliveryAddress -_id')
        .select('-seller -__v')
        .lean();

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
    getSellerSubOrders
}