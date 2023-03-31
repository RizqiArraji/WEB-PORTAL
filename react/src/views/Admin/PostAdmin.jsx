import { Link, useParams } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faWindowRestore } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axiosClient from "../../tools/axios.client"
import { Outlet } from "react-router-dom"

export default function PostAdmin(){
    const [product, setProduct]= useState([]);
    const {id}= useParams();
    const navigate= useNavigate();


    useEffect(()=>{
        fetchData();
    },[])

    const fetchData= () => {
        axiosClient.get('http://127.0.0.1:8000/api/index')
        .then(({data})=>{
            data.map((e)=>{
                setProduct(e)
            })
        })
    }

    const OnDelete= async (e, id)=>{
        await axiosClient.delete("http://127.0.0.1:8000/api/delete/"+ id)

        navigate('/')
    }
    return(
       <>
       <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-4" style={{ height: 100+'vh' }}>
      <h2>Post Controller</h2>
        <div>
           <Link to={'/dashboard/create'}><h6>Create New Post</h6></Link>
        </div>
      <div className="table-responsive">
        <table className="table table-striped table-sm text-center">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Excerpt</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
                product.length > 0 && (product.map((row, key)=>{
                    return(
                <tr key={row.competitor}>
                   <td>{key+1}</td>
                  <td>{row.title}</td>
                  <td>{row.author.name}</td>
                  <td>{row.excerpt}</td>
                  <td className="d-flex justify-content-center">
                    <span className="badge">
                    <Link to={'/dashboard/show/'+ row.id}>
                    <FontAwesomeIcon icon={faEye}/>
                    </Link>
                    </span>
                    <span className="">

                    <button className="badge border-0" onClick={(e)=>OnDelete(e, row.id)}>
                    <FontAwesomeIcon icon={faTrash} className="text-danger"/>
                    </button>

                    </span>
                    <span className="badge">
                        <Link to={'/dashboard/update/'+ row.id}>
                            <FontAwesomeIcon icon={faWindowRestore} className="text-info"/>
                        </Link>
                    </span>
                  </td>
                </tr>

)
                })
            )}
          </tbody>
        </table>
      </div>
    </main>
    <Outlet />
    </>
    )
}
