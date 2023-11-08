import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import GuestLayout from "./layout/GuestLayout";
import ProtectedLayout from "./layout/ProtectedLayout";
import Profile from "./pages/shippments/Profile";
import AddShipment from "./pages/shippments/AddShipment";
import TrackShipment from "./pages/shippments/TrackShipment";

const router = createBrowserRouter([

 
    {
        path:'/',
        element: <ProtectedLayout />,
        children:[
            {
                path:'/',
                element:<Navigate to="/profile" />
            },
            {
                path:'/profile',
                element:<Profile />
            },
            {
                path:'/addShipment',
                element:<AddShipment />
            },
           
        ]
    },

    {
        path:'/',
        element: <GuestLayout/>,
        children:[
            {
                path:'/login',
                element:<Login />
            },
            {
                path:'/register',
                element:<Register />
            },
          
        ]
    },
    {
        path:'*',
        element:<NotFound />

    },
    {
        path:'/trackShipment',
        element:<TrackShipment />
    },

])

export default router;
