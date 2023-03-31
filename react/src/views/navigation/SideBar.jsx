import React from "react"
import { Link, Navigate } from "react-router-dom"
import { useState, useEffect } from "react";
import axiosClient from "../../tools/axios.client";
import { useStateContext } from "../../tools/ContextProvider";
import User from "./sidebar/User";
import Admin from "./sidebar/Admin";

export default function SideBar(){
   const {user, token}= useStateContext();

   console.log(user)
   if(user.is_admin !== 1){
    if(!token){
        return <Navigate to={'/'}/>
    }
    return <User />
   }else{
    return <Admin />
   }
}
