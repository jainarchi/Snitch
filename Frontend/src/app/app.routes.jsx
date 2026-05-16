import {lazy } from 'react'
import {createBrowserRouter , Navigate} from 'react-router-dom'



const Register = lazy(() => import("../features/auth/pages/Register"));
const Login = lazy(() => import("../features/auth/pages/Login"));

const ProductDetails = lazy(() => import("../features/products/pages/ProductDetails"));
const CreateProduct = lazy(() => import("../features/products/pages/CreateProduct"));
const Home = lazy(() => import("../features/products/pages/Home"));

const SellerDashboard = lazy(() => import("../features/seller/layout/Dashboard"));
const SellerDashboardOverview = lazy(() => import("../features/seller/pages/Overview"));
const EditProductDetails = lazy(() => import("../features/seller/pages/EditProductDetails"));
const SellerSetting = lazy(() => import("../features/seller/pages/Setting"));
const SellerRevenue = lazy(() => import("../features/seller/pages/Revenue"));
const SellerProducts = lazy(() => import("../features/seller/pages/Products"));
const SellerOrder = lazy(() => import("../features/seller/pages/Order"));

const Cart = lazy(() => import("../features/cart/pages/Cart"));
const Wishlist = lazy(() => import("../features/wishlist/pages/Wishlist"));

const OrderSuccess = lazy(() => import("../features/cart/pages/OrderSuccess"));

const UserProfile = lazy(() => import("../features/account/pages/UserProfile"));

const Order = lazy(() => import("../features/order/pages/Order"));
const OrderDetails = lazy(() => import("../features/order/pages/OrderDetails"));

import AppLayout from './AppLayout';
import Protected from '../features/auth/components/Protected';


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
                path: `order-success`,
                element: <Protected >
                    <OrderSuccess />
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
                        element: <Navigate to="overview" replace />
                    },
                    {
                        path: "overview",
                        element: <SellerDashboardOverview />,
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
                        path: "revenue",
                        element: <SellerRevenue />,
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
