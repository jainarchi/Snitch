import {createBrowserRouter} from 'react-router-dom'
import Register from '../features/auth/pages/Register'
import Login from '../features/auth/pages/Login'
import CreateProduct from '../features/products/pages/CreateProduct'
import Protected from '../features/auth/components/Protected'
import SellerDashboard from '../features/products/pages/SellerDashboard'


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
        path : '/seller',
        children : [
            {
                path: '/seller/create-product',
                element: <Protected role="seller" >
                            <CreateProduct />
                        </Protected>
            },
            {
                path:'/seller/dashboard',
                element: <Protected role="seller" >
                            <SellerDashboard />
                        </Protected>
            }
        ]
       
    }
])