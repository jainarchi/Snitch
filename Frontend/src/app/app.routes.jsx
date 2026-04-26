import {createBrowserRouter} from 'react-router-dom'
import Register from '../features/auth/pages/Register'
import Login from '../features/auth/pages/Login'
import CreateProduct from '../features/products/pages/CreateProduct'


export const appRouter = createBrowserRouter([
    {
        path : '/' ,
        element : <h1>Home page</h1>
    },
    {
        path : '/login' ,
        element : <Login />
    },
    {
        path : '/register' ,
        element : <Register />  
    },
    {
        path : '/seller/products/create' ,
        element : <CreateProduct />
    }
])