import { createBrowserRouter } from "react-router-dom";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import ProductDetails from "../features/products/pages/ProductDetails";
import CreateProduct from "../features/products/pages/CreateProduct";
import Protected from "../features/auth/components/Protected";
import Home from "../features/products/pages/Home";

import SellerDashboard from "../features/seller/layout/Dashboard";
import SellerDashboardOverview from "../features/seller/pages/Overview";
import EditProductDetails from "../features/seller/pages/EditProductDetails";
import SellerSetting from "../features/seller/pages/Setting";
import SellerRevenue from "../features/seller/pages/Revenue";
import SellerProducts from "../features/seller/pages/Products";
import SellerOrder from "../features/seller/pages/Order";
import { Navigate } from "react-router-dom";

import Cart from "../features/cart/pages/Cart";


export const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
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
        path: "/products/:productId",
        element: <ProductDetails />,
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
        path : "/cart",
        element: <Protected> <Cart /></Protected>

    },



    {
        path: "*",
        element: <Navigate to="/" replace />
    }
]);
