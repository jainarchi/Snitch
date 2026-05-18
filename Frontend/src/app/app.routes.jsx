import {lazy } from 'react'
import {createBrowserRouter , Navigate} from 'react-router-dom'

import AppLayout from './AppLayout';
import Protected from '../features/auth/components/Protected';


const Register = lazy(() => import("../features/auth/pages/Register"));
const Login = lazy(() => import("../features/auth/pages/Login"));

const ProductDetails = lazy(() => import("../features/products/pages/ProductDetails"));
const Home = lazy(() => import("../features/products/pages/Home"));

const CreateProduct = lazy(() => import("../features/seller/pages/CreateProduct"));
const SellerDashboard = lazy(() => import("../features/seller/layout/Dashboard"));
const EditProductDetails = lazy(() => import("../features/seller/pages/EditProductDetails"));
const SellerSetting = lazy(() => import("../features/seller/pages/Setting"));
const SellerProducts = lazy(() => import("../features/seller/pages/Products"));
const SellerOrder = lazy(() => import("../features/seller/pages/Order"));

const Cart = lazy(() => import("../features/cart/pages/Cart"));
const Wishlist = lazy(() => import("../features/wishlist/pages/Wishlist"));
const OrderConfirmed = lazy(() => import("../features/cart/pages/OrderConfirmed"));
const UserProfile = lazy(() => import("../features/account/pages/UserProfile"));
const Order = lazy(() => import("../features/order/pages/Order"));
const OrderDetails = lazy(() => import("../features/order/pages/OrderDetails"));



export const appRouter = createBrowserRouter([

    {
        path: "/",
        element : <AppLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/products/:productId",
                element: <ProductDetails />,
            },
            {
                path: "cart",
                element: <Protected >
                    <Cart />
                </Protected>
            },
            {
                path: "wishlist",
                element: <Protected >
                    <Wishlist />
                </Protected>
            },
            {
                path: `order-confirmed`,
                element: <Protected >
                    <OrderConfirmed />
                </Protected>
            },
            {
                path: '/profile',
                element: <Protected>
                    <UserProfile />
                </Protected>
            },
            {
                path : 'orders',
                element : <Protected>
                    <Order />
                </Protected>
            },
            {
                path : 'orders/:orderId',
                element : <Protected>
                    <OrderDetails />
                </Protected>
            }
        ]
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },

    {
        path: "/seller",
        children: [
            {
                index: true,
                element: <Navigate to="dashboard" replace />
            },
            {
                path: "create-product",
                element: <Protected role="seller">
                    <CreateProduct />
                </Protected>
            },
            {
                path: "dashboard",
                element: <Protected role="seller">
                    <SellerDashboard />
                </Protected>,

                children: [
                    {
                        index: true,
                        element: <Navigate to="products" replace />
                    },
                    {
                        path: "create-product",
                        element: <CreateProduct />,
                    },
                    {
                        path: "products/:productId/variant",
                        element: <EditProductDetails />,
                    },
                    {
                        path: "settings",
                        element: <SellerSetting />,
                    },
                    {
                        path: "products",
                        element: <SellerProducts />,
                    },
                    {
                        path: "orders",
                        element: <SellerOrder />,
                    },
                ],
            },
        ],
    },


    {
        path: "*",
        element: <Navigate to="/" replace />
    }
]);
