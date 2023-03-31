import React, { useEffect, useState } from "react"
import axiosClient from "../../../tools/axios.client";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../tools/ContextProvider";

export default function Create(){
    const navigate= useNavigate();
    const {user}= useStateContext();


    const [title, setTitle]= useState();
    const [slug, setSlug]= useState();
    const [excerpt, setExcerpt]= useState();
    const [body, setBody]= useState();
    const [category_id, setCategoryId]= useState();
    const [image, setImage]= useState([]);
    const [kategori, setKategori]= useState([]);

    const OnSubmit=()=>{
        const formData= new FormData;
        formData.append('title', title)
        formData.append('slug', slug)
        formData.append('excerpt', excerpt)
        formData.append('body', body)
        formData.append('category_id', category_id)
        formData.append('image', image)


        axiosClient.post('/store', formData);

        console.log(`${title}, ${slug}, ${body}, ${image}`)
        navigate('/dashboard/posts')

    }

    useEffect(()=>{
        fetchCategory();
    },[])

    const fetchCategory= ()=>{
        axiosClient.get('/category')
        .then(({data})=>{
            data.map((e)=>{
                setKategori(e)
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
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-5 mb-5" style={{ height: 100+'vh' }}>

    <h1 className="h3 mb-3 fw-normal">Create Post</h1>
      <label className="mt-1">Title</label>
      <input type="text" className="form-control w-75 mt-1"  placeholder="Title"
      onChange={(e)=>setTitle(e.target.value)}
      required
      />

      <label className="mt-1">Slug</label>
      <input type="text" className="form-control w-75 mt-1"  placeholder="Slug"
      onChange={(e)=>setSlug(e.target.value)}
      required
      />

      <label className="mt-1">Excerpt</label>
      <input type="text" className="form-control w-75 mt-1"  placeholder="Excerpt"
      onChange={(e)=>setExcerpt(e.target.value)}
      />

      <label className="mt-1">Body</label>
      <textarea rows={'10'} cols={'40'} type="text" className="form-control w-75 mt-1"  placeholder="Body"
      onChange={(e)=>setBody(e.target.value)}
      required
      />

      <div className="mb-3">
          <label className="form-label">Category</label>
          <br />
          <select name="category_id" className="form-label costum-select"
          onChange={(e)=>{
            const selectCategories= e.target.value;
            setCategoryId(selectCategories)
          }}
          >
        {
            kategori.length > 0 && (
                kategori.map((row)=>{
                    console.log(row.id)
                    return(
              <option value={row.id}>{row.name}</option>
          )
      })
  )
}
          </select>
        </div>



      <label className="mt-1">Image</label>
      <img src={''} alt="" className="img-preview img-fluid mb-3 col-sm-5"/>
      <input type="file" id="image" className="form-control w-75"
    onChange={(e)=>setImage(e.target.files[0])}
    onChangeCapture={imageHandler}
    required
      />



    <button className="btn btn-lg btn-primary mt-5 w-75" type="submit" onClick={OnSubmit}>Create Post</button>
</main>
        </>
    )
}


