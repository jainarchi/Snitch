import axios from "axios";


const productApi = axios.create({
    baseURL : '/api/products',
    withCredentials : true
})


export async function createProducts (formData){
 const response = await productApi.post('/' , formData)
 return response.data
 //message product
}


export async function getAllProductsBySeller (){
    const response = await productApi.get('/seller')
    return response.data
    // products
}