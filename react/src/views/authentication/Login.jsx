import { Link, useNavigate } from "react-router-dom"
import { useRef } from "react";
import axiosClient from "../../tools/axios.client";
import { useState } from "react";
import { useStateContext } from "../../tools/ContextProvider";

export default function Login() {
    const navigate= useNavigate();
    const emailRef= useRef();
    const [errors, setErrors]= useState();
    const passwordRef= useRef();

    const {setUser, setToken}= useStateContext();

    const onSubmit= (ev)=>{
        ev.preventDefault();

        const payload={
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        console.log(payload)

        axiosClient.post('/login', payload)
        .then(({data})=>{
            setToken(data.token)
            setUser(data.user)
        navigate('/')
        })
        .catch(err=>{
            console.log(err)
            const response= err.response;
            if(response && response.status === 422){
                if(response.data.errors){
                setErrors(response.data.errors)
            }else{
                email: [response.data.message]
            }
            }
        })
    }
    return (
      <>
      <div className="container mt-4">
  <main className="form-signin m-auto w-75 text-center">
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
        <input ref={emailRef} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" autoFocus/>
        <label>Email address</label>
      </div>
      <div className="form-floating">
        <input ref={passwordRef} type="password" className="form-control" id="floatingPassword" placeholder="Password" />
        <label>Password</label>
      </div>

      <button className="w-100 mt-3 btn btn-lg btn-primary" type="submit" onClick={onSubmit}>Login</button>

      <p className="text-center"><b>Note:</b>Belum Terdaftar? <Link to={'/registrasi'}>Daftar</Link></p>
  </main>
      </div>
      </>
    )
  }
