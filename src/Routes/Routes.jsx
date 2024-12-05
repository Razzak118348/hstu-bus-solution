

import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/Login/Login";
import Signup from "../pages/SignUp/SignUp";
import Root from "../Root/Root";
import Error from "../Error/Error";
import Stopage from "../pages/Stopage/Stopage";
import Admin from "../pages/Admin/Admin";
import Teachers from "../pages/Teachers/Teachers";
import Update from "../pages/update/update";
import Home from "../pages/Home/Home";
import PrivetRout from "./PrivateRout";


const Routes = createBrowserRouter(
    [
    {
        path: '/',
        element: <Root></Root> ,
        errorElement: <Error></Error> ,
        children: [
            {
                path: '/',
                element: <Home></Home>,
                loader: async() => fetch('https://project-server-lac.vercel.app/allbuss')
            },
            {
                path:'/login',
                element:<Login></Login>

            },
            {path:'/signup',
                element:<Signup></Signup>

            },
            {
                path:'/bussStopage',
                element:<Stopage></Stopage>
            },
            {
                path:'/admin',
                element: <Admin></Admin>,
                loader: async()=> fetch('https://project-server-lac.vercel.app/allbuss')
            },
            {
                path:'/teacher',
                element: <PrivetRout children={<Teachers></Teachers>}></PrivetRout>
            },
            {
                path:'/allbus/:id',
                element: <Update></Update>,
                loader: async({params}) => fetch(`https://project-server-lac.vercel.app/allbuss/${params.id}`)
            }


        ]
    }
],
{
    future: {
      v7_startTransition: true,  // Enable early v7 startTransition behavior
      v7_partialHydration: true, // Enable early v7 partial hydration behavior
    },
  }

)

export default Routes;
