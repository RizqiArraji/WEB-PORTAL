
import NavBar from "../views/navigation/NavBar"
import { Outlet } from "react-router-dom"

export default function Default(){
    return(
        <>
        <NavBar></NavBar>
        <div>
            <Outlet></Outlet>
        </div>
        </>
    )
}
