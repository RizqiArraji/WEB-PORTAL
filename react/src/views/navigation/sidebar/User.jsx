import React from "react"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import axiosClient from "../../../tools/axios.client";

export default function User(){
    const [card, setCard]= useState([]);

    useEffect(()=>{
        fetchData()
    },[])

    const fetchData=()=>{
        axiosClient.get('/index')
        .then(({data})=>{
            data.map((e)=>{
                setCard(e)
            })
        })
    }
    return(
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to={'/dashboard'} className="nav-link active" aria-current="page">
              <span data-feather="home"></span>
              Dashboard
            </Link>
            <Link className="nav-link active" aria-current="page" to={"/dashboard/posts"}>
              <span data-feather="home"></span>
              Post
            </Link>
          </li>
        </ul>


        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <a className="link-secondary" href="#" aria-label="Add a new report">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
      </div>
    </nav>
    )
}
