import { useStateContext } from "../tools/ContextProvider"
import SideBar from "./navigation/SideBar"
import { Navigate, Outlet, useNavigate } from "react-router-dom"

export default function Dashboard(){
    const {user, token}= useStateContext();
    const navigate= useNavigate()

    if (!token) {
        return <Navigate to={'/login'}/>
    }else{
            return(
                <div className="container-fluid h-max">
                <div className="row">
                <SideBar />
                <Outlet/>
                </div>
                </div>
            )
    }
        }
