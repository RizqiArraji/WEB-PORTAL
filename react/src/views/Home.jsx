import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import axiosClient from "../tools/axios.client";
import { Outlet } from "react-router-dom";
import moment from "moment/moment";

export default function Home(){
    const {id}= useParams()
    const dateTime= new Date();

    const [card, setCard]= useState([]);
    const [banner, setBanner]= useState([]);

    useEffect(()=>{
        fetchData()
        fetching()
    },[])

    const fetchData=()=>{
        axiosClient.get('/index')
        .then(({data})=>{
            data.map((e)=>{
                setCard(e)
            })
        })
    }

    const fetching=()=>{
        axiosClient.get('/banner')
        .then(({data})=>{
            setBanner(data)
        })
    }

    return(
        <>
            <div className="row w-80 m-auto mt-5">
      {
        banner.length > 0 && (banner.map((row)=>{
            return(
       <Link to={'/post/'+ row.id} className="card mb-3 w-75 h-30 m-auto text-decoration-none text-dark">
       <img src={`http://127.0.0.1:8000/storage/images/${row.image}`} className="card-img-top" width={300} height={300}  />
   <div className="card-body">
     <h3 className="card-title">{row.title}</h3>
     <h6>Ditulis Oleh <em>{row.author.name}</em></h6>
     <p className="card-text">{row.excerpt}</p>
  <Link className="col text-decoration-none" to={'/post/'+ row.id}>Lihat Selengkapnya...</Link>
   </div>
 </Link>
            )
        }))
      }


<div className="row row-cols-1 row-cols-md-3 g-4 m-auto mb-5">
    {
        card.length > 0 && (
            card.map((row)=>{
                return(
                    <>
  <Link className="col text-decoration-none text-dark" to={'/post/'+ row.id}>
    <div className="card">
      <img src={`http://127.0.0.1:8000/storage/images/${row.image}`} className="card-img-top"  width={200} height={200}/>
      <div className="card-body">
        <h3 className="card-title text-decoration-none text-primary">{row.title}</h3>
        <h6 className="card-title text-decoration-none">Ditulis Oleh <em className="text-primary">{row.author.name}</em></h6>
        <p className="card-text">{row.excerpt}</p>
      </div>
  <Link className="col text-decoration-none px-3 pb-2" to={'/post/'+ row.id}>Lihat Selengkapnya...</Link>
    </div>
  </Link>

                    </>

                )
            })
        )
    }
</div>
    </div>
    </>
    )
}
