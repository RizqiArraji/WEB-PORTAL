import { createBrowserRouter } from "react-router-dom";
import Home from '../views/Home'
import About from '../views/About'
import Dashboard from '../views/Dashbard'
import Posts from '../views/Admin/Posts'
import Admin from '../views/Admin/Admin'
import Create from '../views/Admin/crud/Create'
import Update from '../views/Admin/crud/Update'
import Show from '../views/Admin/crud/Show'
import Default from "../components/Default";
import Login from "../views/authentication/Login";
import Registrasi from "../views/authentication/Registrasi";
import Post from "../views/Post";
import DashBoard from "../views/navigation/dashboard";
import PostAdmin from "../views/Admin/PostAdmin";

const router= createBrowserRouter([
    {
        path: '/',
        element: <Default/>,
        children: [
            {
                path: '/',
                element: <Home/>,
            },
            {
                path: '/about',
                element: <About/>
            },
            {
                path: '/dashboard',
                element: <Dashboard/>,
                children: [
                    {
                        path: '/dashboard/Dashboard',
                        element: <DashBoard />,
                        children:[

                        ]
                    },
                    {
                        path: '/dashboard/posts',
                        element: <Posts/>,
                        children:[

                        ]
                    },
                    {
                        path: '/dashboard/admin',
                        element: <Admin/>
                    },
                    {
                        path: '/dashboard/postAdmin',
                        element: <PostAdmin/>
                    },
                    {
                        path: '/dashboard/create',
                        element: <Create/>
                    },
                    {
                        path: '/dashboard/update/:id',
                        element: <Update/>
                    },
                    {
                        path: '/dashboard/show/:id',
                        element: <Show/>
                    }
                ]
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/registrasi',
                element: <Registrasi/>
            },
            {
                path: '/post/:id',
                element: <Post/>
            }

        ]
    },
])

export default router
