import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faWindowRestore } from '@fortawesome/free-solid-svg-icons'
import { Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
import axiosClient from "../../tools/axios.client"

export default function Admin(){
    const [data, setData]= useState([]);

    useEffect(()=>{
        fetchData()
    },[])

    const fetchData=()=>{
        axiosClient.get('/user')
        .then(({data})=>{
            data.map((e)=>{
                setData(e)
            })
        })
    }

    const OnDelete= async (e, id)=>{
        await axiosClient.delete("http://127.0.0.1:8000/api/UserDelete/"+ id)
      }

    return(
        <>
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-4" style={{ height: 100+'vh' }}>
      <h2>Users Controller</h2>
      <div className="table-responsive">
        <table className="table table-striped table-sm text-center">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
                data.length > 0 && (
                    data.map((row, key)=>{
                        return(
                <tr key={row.competitor}>
                   <td>{key+1}</td>
                   <td>{row.name}</td>
                  <td>{row.email}</td>
                  <td className="d-flex justify-content-center">
                    <span className="">
                    <button className="badge border-0" onClick={(e)=>OnDelete(e, row.id)}>
                    <FontAwesomeIcon icon={faTrash} className="text-danger"/>
                    </button>
                    </span>
                  </td>
                </tr>
                        )
                    })
                )
            }
          </tbody>
        </table>
      </div>
    </main>
    <Outlet />
        </>
    )
}
