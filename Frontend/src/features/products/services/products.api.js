import axios from "axios";


const productApi = axios.create({
    baseURL : '/api/products',
    withCredentials : true
})


export async function createProducts (formData){
 const response = await productApi.post('/' , formData)
 return response.data
}


// get all products made by seller and show on seller dashboard
export async function getAllProductsBySeller (){
    const response = await productApi.get('/seller')
    return response.data
  
}


// get all products to show on home page
export async function getAllProducts() {
    const response = await productApi.get('/')
    return response.data
    
}



// get product details by id 

export async function getProductDetails(productId){
    const response = await productApi.get(`/${productId}/details`)
    return response.data
}


export async function deleteProduct (productId){
    const response = await productApi.delete(`/${productId}`)
    return response.data
}


export async function addProductVariant(productId , formData){
    const response = await productApi.post(`/${productId}/variant` , formData)
    return response.data
}




