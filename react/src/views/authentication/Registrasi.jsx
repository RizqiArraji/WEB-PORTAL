import { useRef } from "react"
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axiosClient from "../../tools/axios.client";
import { useStateContext } from "../../tools/ContextProvider";

export default function Registrasi() {
    const nameRef= useRef();
    const emailRef= useRef();
    const passwordRef= useRef();
    const [errors, setErrors]= useState();
    const navigate= useNavigate();
    const {setUser, setToken}= useStateContext();

    const onSubmit= (ev)=>{
        ev.preventDefault();

        const payload={
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        console.log(payload)

        axiosClient.post('/signup', payload)
        .then(({data})=>{
            setToken(data.token)
            setUser(data.user)

          navigate('/')
        })
        .catch(err=>{
            console.log(err)
            const response= err.response;
            if(response && response.status === 422){
                setErrors(response.data.errors)
            }
        })
    }


  return (
    <>
      <div className="container mt-4">
<main className="form-signin text-center w-75 m-auto">
    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
    {
        errors && <div className="alert bg-danger text-white">
            {Object.keys(errors).map(key=>{
                return(
                    <p key={key}>{errors[key][0]}</p>
                )
            })}
        </div>
    }
    <div className="form-floating">
      <input type="text" className="form-control" id="floatingInput" placeholder="Username"
      ref={nameRef}
      />
      <label>Username</label>
    </div>

    <div className="form-floating">
      <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
      ref={emailRef}
      />
      <label>Email address</label>
    </div>

    <div className="form-floating">
      <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
      ref={passwordRef}
      />
      <label>Password</label>
    </div>

    <button className="w-100 mt-3 btn btn-lg btn-primary" type="submit" onClick={onSubmit}>Sign in</button>

    <p className="text-center"><b>Note:</b>Sudah Registrasi? <Link to={'/login'}>Login</Link></p>
</main>
      </div>
    </>
  )
}
