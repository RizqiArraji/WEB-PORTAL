import { useParams } from "react-router-dom"
import axiosClient from "../../../tools/axios.client";
import { useEffect, useState } from "react";


export default function Show(){
    const {id}= useParams();
    const [data, setData]= useState([])

    useEffect(()=>{
        fetchData()
    }, [])

    const fetchData=()=>{
        axiosClient.get('/show/'+ id)
        .then(({data})=>{
          setData(data)
        })
    }

    return(
        <>
       <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-0" style={{ height: 100+'vh' }}>
       <div className="container">
        {
            data.length > 0 && (data.map((row, key)=>{
                    return(
       <div className="row justify-content-center mb-5" key={key}>
           <div className="col-md-8">
              <div className="mb-6">
                  <h2>{row.title}</h2>
                  <a href="/dashboard/posts" className="btn btn-success">Back to all My Posts</a>

                 <a href="" className="btn btn-success">Edit</a>
                     <button className="btn-danger border-1" onclick="return confirm('Are you sure?')">Delete</button>
                   <div className="max-height-300px">
                    <p>{row.slug}</p>
                       <img className="card-img-top mt-3" src={`http://127.0.0.1:8000/storage/images/${row.image}`}/>
                     </div>
                     <p>{row.body}</p>
                <div>
                </div>
             </div>
         </div>
     </div>

                    )
                })
            )}
 </div>
 </main>
</>
    )
}
