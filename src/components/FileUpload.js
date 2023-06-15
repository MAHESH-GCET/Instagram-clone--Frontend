import React from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useState } from 'react'

function FileUpload() {
    // form
    const {register,handleSubmit}=useForm()
    const [profileUrl,setProfileUrl]=useState([])

    //handle and convert it in base 64
    const handleImage = (e) =>{
        const file = e.target.files[0];
        setFileToBase(file);
        console.log(file);
    }

    const setFileToBase = (file) =>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () =>{
            setProfileUrl(reader.result);
        }

    }

    const onSubmit=async(formValues)=>{
        try{
        let  response=await axios.post('http://localhost:5000/upload',{profileUrl})
        console.log(response)
        } catch(er){
            console.log(er)
        }
    }

  return (
    <div className='container'>
        <form
        onSubmit={handleSubmit(onSubmit)}
        >
        <form className="form-outline mb-4">
                <input onChange={handleImage}  type="file" id="formupload" name="image" className="form-control"  />
                <label className="form-label" htmlFor="form4Example2">Image</label>
        </form>
        <div>
            <button type='submit'>Submit</button>
        </div>
        </form>
    </div>
  )
}

export default FileUpload