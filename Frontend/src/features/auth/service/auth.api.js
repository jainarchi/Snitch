import axios from "axios";

const authApi = axios.create({
    baseURL : 'http://localhost:3000/api/auth',
    withCredentials : true
})



export async function register ({fullname ,email , password , contact , isSeller = false}){

    const response = await authApi.post('/register' , {
      fullname,  
      email , 
      password , 
      contact , 
      isSeller
    })

    return response.data
}



export async function login ({email , password }){

    const response = await authApi.post('/login' , {
        email , 
        password
    })

    return response.data
}
