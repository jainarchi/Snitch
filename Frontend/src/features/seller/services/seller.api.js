import axios from "axios";



const sellerApi = axios.create({
    baseURL : '/api/seller',
    withCredentials : true
})



async function getSellerSubOrders () {
    const response = await sellerApi.get('/orders')
    return response.data
}