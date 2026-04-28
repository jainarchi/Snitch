import {createBrowserRouter} from 'react-router-dom'
import Register from '../features/auth/pages/Register'
import Login from '../features/auth/pages/Login'
import ProductDetails from '../features/products/pages/ProductDetails'
import CreateProduct from '../features/products/pages/CreateProduct'
import Protected from '../features/auth/components/Protected'
import SellerDashboard from '../features/products/pages/SellerDashboard'
import SellerProductDetails from '../features/products/pages/SellerProductDetails'
import Home from '../features/products/pages/Home'



export const appRouter = createBrowserRouter([
    {
        path : '/' ,
        element : <Home />
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
        path : '/products/:productId',
        element : <ProductDetails />

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
            { // show all products cart created by seller
                path:'/seller/dashboard',
                element: <Protected role="seller" >
                            <SellerDashboard />
                        </Protected>
            },
            { // show product detail and have options to edit for seller
                path: '/seller/products/:productId',
                element: <Protected role="seller" >
                            <SellerProductDetails />
                        </Protected>
            }
        ]
       
    }
])