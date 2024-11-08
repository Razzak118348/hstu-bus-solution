

import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/SignUp/SignUp";
import Root from "../Root/Root";
import Error from "../Error/Error";
import Stopage from "../pages/Stopage/Stopage";
import Admin from "../pages/Admin/Admin";
import Teachers from "../pages/Teachers/Teachers";
import Update from "../pages/update/update";


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
                loader: async() => fetch('http://localhost:5000/allbuss')
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
                loader: async()=> fetch('http://localhost:5000/allbuss')
            },
            {
                path:'/teacher',
                element: <Teachers></Teachers>
            },
            {
                path:'/allbuss/:id',
                element: <Update></Update>,
                loader: async({params}) => fetch(`http://localhost:5000/allbuss/${params.id}`)
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