import userModel from "../models/user.model.js";
import productModel from "../models/product.model.js";
import { uploadFiles } from "../services/image.service.js";



const addColorVariant = async ({ product, priceAmount, color, sizes, files }) => {

const normalizedColor = color.toLowerCase().trim();

  const seen = new Set(
    product.variants.map(v => `${v.color}-${v.size}`)
  );

  const images = await Promise.all(
    files.map((file) =>
      uploadFiles({
        buffer: file.buffer,
        fileName: file.originalname,
      }),
    ),
  );



  // add images to imagesByColor
  product.imagesByColor.set(
    normalizedColor,
    images.map(img => ({ url: img.url }))
  )

  // create variants
  sizes.forEach(s => {
    const size = s.size.toUpperCase().trim();
    const key = `${normalizedColor}-${size}`;

    if (seen.has(key)) {
          throw new Error(`Duplicate variant: ${key}`);
    }

    seen.add(key);
    product.variants.push({
      size: s.size,
      stock: s.stock,
      price: {
        amount: Number(priceAmount) || product.price.amount,
        currency: product.price.currency
      },
      color: normalizedColor
    })
  })

}


const createProduct = async (req, res) => {
  try {
    const { title, description, priceAmount, priceCurrency, color, sizes } = req.body


    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    const product = await productModel({
      seller: req.seller.id,
      title,
      description,
      price: {
        amount: priceAmount,
        currency: priceCurrency,
      }

    });


    await addColorVariant({
      product, 
      priceAmount, 
      color, 
      sizes , 
      files : req.files
    })


    await product.save()


    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    })

  }
  catch (err) {
    if (err.code === 11000 || err.message.includes('Duplicate variant')) {
  return res.status(400).json({
    success: false,
    message: "Variant already exists"
  });
}
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};




const createVariants = async (req, res) => {
  try {

    const product = await productModel.findOne({
      _id: req.params.id,
      seller: req.seller.id
    })


    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      })
    }


    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }


    const { priceAmount, color, sizes } = req.body



    await addColorVariant({
      product,
      priceAmount,
      color,
      sizes,
      files: req.files

    })

    await product.save()


    res.status(200).json({
      success: true,
      message: "Variants created successfully",
      product
    })

  }
  catch (err) {
    if(err.code === 11000 || err.message.includes('Duplicate variant')){
      return res.status(400).json({
        success : false,
        message : "Variant already exists"
      })
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong"
    })
  }
}



// get all products made by seller


const getAllProductsBySeller = async (req, res) => {
  try {
    const allProducts = await productModel.find({ seller: req.seller.id }).lean()

    if (!allProducts || allProducts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found"
      })
    }


    const products = allProducts.map(p => {
      const totalStock = p.variants.reduce((acc, v) => { return acc + v.stock }, 0)

      return {
        ...p,
        totalStock

      }
    })

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: "Something went wrong"
    })
  }
}

const getProductDetails = async (req, res) => {
  const productId = req.params.id

  try {
    const product = await productModel.findById(productId)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      })
    }

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      product
    })

  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: "Something went wrong"
    })
  }
}


const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.aggregate([
      {
        $project: {
          title: 1,
          price: 1,

          image: {
            $let: {
              vars: {
                firstColor: {
                  $arrayElemAt: [
                    { $objectToArray: "$imagesByColor" },
                    0
                  ]
                }
              },
              in: {
                $arrayElemAt: ["$$firstColor.v.url", 0]
              }
            }

          }
        }
      }
    ])



    if (!products) {
      return res.status(404).json({
        success: false,
        message: "Products not found"
      })
    }

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products
    })

  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: "Something went wrong"
    })
  }
}


// delete product by seller controller 
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id

    const product = await productModel.findOneAndDelete({
      _id: productId,
      seller: req.seller.id
    })


    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      })
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully"
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







export {
  createProduct,
  getAllProductsBySeller,
  getProductDetails,
  getAllProducts,
  deleteProduct,
  createVariants
};



// Color: [Red]         - req.body.color
// Price: [optional]    - req.body.price
// Images: [upload]     - req.files

// Sizes:                  - req.body.sizes  || min length 1
//   Size: [S]  Stock: [ ]
//   Size: [M]  Stock: [ ]

// [ + Add Size ]