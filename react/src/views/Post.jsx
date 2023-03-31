import { useParams } from "react-router-dom"
import axiosClient from "../tools/axios.client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function Post(){
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

    const OnDelete= async (id)=>{
        await axiosClient.delete("/delete/"+ id)

        // navigate('/controller')
      }

    return(
        <>
       <main className="col-md-20 px-md-4 mt-5 mb-5" style={{ height: 100+'vh' }}>
       <div className="container">
        {
            data.length > 0 && (data.map((row, key)=>{
                    return(
       <div className="row justify-content-center mb-5" key={key}>
           <div className="col-md-8">
              <div className="mb-6">
                  <h2>{row.title}</h2>
                  {/* <Link to="/" className="btn btn-success">Back to all Posts</Link>

                 <Link to={'/dashboard/update/'+ row.id} className="btn btn-success mx-1">Edit</Link>
                     <button className="btn-danger border-1 mx-1" onClick={OnDelete}>Delete</button> */}
                   <div>
                    <p>Ditulis Oleh <em className="text-primary">{row.author.name}</em></p>
                       <img className="card-img-top mt-2" src={`http://127.0.0.1:8000/storage/images/${row.image}`}/>
                     </div>
                     <p className="mt-5">{row.body}</p>
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
