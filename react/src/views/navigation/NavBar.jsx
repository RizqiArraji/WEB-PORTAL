import { Link, Outlet } from "react-router-dom"
import { useStateContext } from "../../tools/ContextProvider"
import GuestNav from "./GuestNav";
import AuthNav from "./AuthNav"
import { useState } from "react";
import { faTable } from "@fortawesome/free-solid-svg-icons";

export default function NavBar(){
    const {token}= useStateContext();

    {
        if (!token) {
            return <GuestNav />
        }else{
            return <AuthNav/>
        }
    }
}
