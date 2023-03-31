import React, { useEffect, useState } from "react"
import axiosClient from "../../../tools/axios.client";
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../../../tools/ContextProvider";

export default function Update(){
    const navigate= useNavigate();
    const [data, setData]= useState([]);
    const {user}= useStateContext();
    const {id}= useParams()

    const [title, setTitle]= useState();
    const [slug, setSlug]= useState();
    const [excerpt, setExcerpt]= useState();
    const [body, setBody]= useState();
    const [image, setImage]= useState([]);

    const OnSubmit= async ()=>{

        const formData = new FormData()
        formData.append('_method', 'PUT')
        formData.append('title', title);
        formData.append('slug', slug);
        formData.append('excerpt', excerpt);
        formData.append('body', body);
        if(image !== null){
         formData.append('image', image)
        }

        await axiosClient.post('http://127.0.0.1:8000/api/update/' + id, formData)

        navigate('/')

    }

    useEffect(()=>{
        fetchData();
    },[])

    const fetchData=()=>{
        axiosClient.get('/edit/'+id)
        .then(({data})=>{
                setData(data)
                data.map((e)=>{
                    setTitle(e.title)
                    setSlug(e.slug)
                    setExcerpt(e.excerpt)
                    setBody(e.body)
                })
        })
    }

    const imageHandler= ()=>{
        const image= document.querySelector('#image');
        const imgPreview= document.querySelector('.img-preview');

        imgPreview.style.display = 'block';

        const oFReader = new FileReader();
        oFReader.readAsDataURL(image.files[0]);

        oFReader.onload = function(oFREvent){
            imgPreview.src = oFREvent.target.result;
        }
    }


    return(
        <>
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-3 mb-5" style={{ height: 100+'vh' }}>

                <h1 className="h3 mb-3 fw-normal">Update Post</h1>
                <label className="mt-1">Title</label>
                <input type="text" className="form-control w-75 mt-1"  placeholder="Title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                />

                <label className="mt-1">Slug</label>
                <input type="text" className="form-control w-75 mt-1"  placeholder="Slug"
                value={slug}
                onChange={(e)=>setSlug(e.target.value)}
                />

                <label className="mt-1">Excerpt</label>
                <input type="text" className="form-control w-75 mt-1"  placeholder="Excerpt"
                value={excerpt}
                onChange={(e)=>setExcerpt(e.target.value)}
                />

                <label className="mt-1">Body</label>
                <textarea rows={'10'} cols={'40'} type="text" className="form-control w-75 mt-1"  placeholder="Body"
                value={body}
                onChange={(e)=>setBody(e.target.value)}
                />

                <label className="mt-1">Image</label>
                <img src={''} alt="" className="img-preview img-fluid mb-3 col-sm-5"/>
                <input type="file" id="image" className="form-control w-75"
              onChange={(e)=>setImage(e.target.files[0])}
              onChangeCapture={imageHandler}
              />
              <p><b>Note:</b> Gambar Wajib Diisi!</p>

    <button className="btn btn-lg btn-primary mt-5 w-75" type="submit" onClick={OnSubmit}>Update Post</button>
</main>
        </>
    )
}


