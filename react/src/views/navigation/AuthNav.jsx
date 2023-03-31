import { Link, Navigate, useNavigate } from "react-router-dom"
import axiosClient from "../../tools/axios.client"
import { useStateContext } from "../../tools/ContextProvider";
import { useEffect } from "react";

export default function AuthNav(){
    const navigate= useNavigate();
    const {user, setUser, setToken}= useStateContext();
    const onLogout= (ev)=>{
        ev.preventDefault()


        axiosClient.post('/logout')
        .then(()=>{
            setUser({})
            setToken(null)

            navigate('/')
        })



    }

    return(
        <>
        <nav className="navbar navbar-expand-md navbar-dark bg-primary" aria-label="Fourth navbar example">
    <div className="container">
      <a className="navbar-brand" href="#">WEB-PORTAL</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false"  aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExample04">
        <ul className="navbar-nav me-auto mb-2 mb-md-0">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to={'/'}>Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to={'/about'}>About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to={'/dashboard/Dashboard'}>Dashoard</Link>
          </li>
        </ul>
      <div className="navbar-nav">
        <div className="nav-item">
        <p className="text-white mb-0 mt-2 mx-4">Wellcome, <em>{user.name}</em></p>
        </div>
        <form onSubmit={onLogout}>
        <button className="dropdown-item nav-link text-white bg-primary" type="submit">Logout</button>
        </form>
    </div>
      </div>
    </div>
  </nav>
        </>
    )
}
