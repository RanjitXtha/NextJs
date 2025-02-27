"use client"
import React, { ChangeEvent, FormEvent, useState } from 'react'
import Image from 'next/image';
import { CreateUserPost } from '@/actions/postaction';
import { auth } from '@clerk/nextjs/server';

const CreatePost = () => {
    const [content , setContent] = useState("");
    const [image , setImage] = useState<File | null>(null);
    const [preview , setPreview] = useState("");
    const [loading , setLoading] = useState(false);

    const handleImage = (e:ChangeEvent<HTMLInputElement>)=>{
   
        const file = e.target.files?.[0];
        if(file){
          setImage(file);
          setPreview(URL.createObjectURL(file))
        }
    }

    const handleSubmit = async(e:FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      console.log(content);
      if(!content){
        console.log("Content is required");
        return;
      }
     
      CreateUserPost(content , image);
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea  placeholder='Type Something' onChange={(e)=>setContent(e.target.value)} />
          <label htmlFor="image-button" className='text-lg font-extrabold text-red-600'>Uploadd</label>
        <input type="file" id="image-button" accept="image/*" onChange={handleImage} />
        {preview && <Image src={preview} alt="uploaded-image" width={50} height={50} />}
        <button type="submit" className='bg-blue-500 text-white rounded-md p-2'>Post</button>
      </form>
    </div>
  )
}

export default CreatePost