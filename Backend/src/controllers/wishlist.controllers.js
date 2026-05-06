import wishlistModel from "../models/wishlist.model.js";
import productModel from "../models/product.model.js";



const toggleProductInWishlist = async (req, res) => {
    const { productId } = req.params

    try {
        const product = await productModel.findById(productId)

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        const favorite = await wishlistModel.findOneAndDelete({
            user: req.user.id,
            product: productId
        })


        if (favorite) {
            return res.status(200).json({
                success: true,
                message: "Removed from wishlist"
            })
        }


        await wishlistModel.create({
            user: req.user.id,
            product: productId
        })


        res.status(200).json({
            success: true,
            message: "Added to wishlist"
        })



    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }


}


const getWishlist = async (req, res) => {

    try {

        const wishlistProducts = await wishlistModel
            .find({ user: req.user.id })
            .select("-user -__v")
            .populate({
                path: "product",
                select: "title price imagesByColor"
            })
            .lean();


        const wishlist = wishlistProducts.map(item => {
            const product = item.product;

            const firstColor = Object.keys(product.imagesByColor)[0];
            

            return {
                _id: item._id,
                product: {
                    _id: product._id,
                    title: product.title,
                    price: product.price,
                    image: product.imagesByColor[firstColor]?.[0]?.url 
                }
            }
        })

        res.status(200).json({
            success: true,
            message: "Wishlist fetched successfully",
            wishlist
        })



    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }


}



export {
    toggleProductInWishlist,
    getWishlist

}