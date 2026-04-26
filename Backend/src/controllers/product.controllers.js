import userModel from "../models/user.model.js";
import productModel from "../models/product.model.js";
import { uploadFiles } from "../services/image.service.js";

const createProduct = async (req, res) => {
  try {
    console.log(req.files);


    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }


    const images = await Promise.all(
      req.files.map((file) =>
        uploadFiles({
          buffer: file.buffer,
          fileName: file.originalname,
        }),
      ),
    );

    console.log(images)
    const { name, description, priceAmount, priceCurrency } = req.body;

    const product = await productModel.create({
      seller: req.user.id,
      name,
      description,
      price: {
        amount: Number(priceAmount),
        currency: priceCurrency,
      },
      images,
    });




    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    })
    
  } 
  catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};


// get all products made by seller


const getAllProductsBySeller = async (req , res) =>{
  try{
    const products = await productModel.find({seller : req.user.id})

    if(!products || products.length === 0){
      return res.status(404).json({
        success : false,
        message : "No products found"
      })
    }

    res.status(200).json({
      success : true ,
      message : "Products fetched successfully",
      products
    })
  }catch(err){
    console.log(err)
    res.status(500).json({
      success : false,
      message : "Something went wrong"
    })
  }
}




export {
   createProduct , 
   getAllProductsBySeller 
};
