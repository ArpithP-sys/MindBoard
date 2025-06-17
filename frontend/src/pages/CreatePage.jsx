import { ArrowLeftIcon } from 'lucide-react'
import React from 'react'
import {useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from 'react-hot-toast'
import axios from 'axios'
import BASE_URL from '../lib/config'

const CreatePage = () => {
  const [title,setTitle]=useState("")
  const [content,setContent]=useState("")
  const [loading, setLoading] = useState(false)
  const navigate=useNavigate()
  const handleSubmit=async (e)=>{
    e.preventDefault()
    // if(!title||!content)
    // {
    //   toast.error("Please enter the fields")
    // toast(
    //   "You can put Null or - also ",
    //   {
    //     duration: 4000,
    //   }
    // )
    // }
    setLoading(true)
    try{
      await axios.post(`${BASE_URL}`,
        {
          title,
          content
        }
      )
      toast.success("Note created successfully!")
      navigate("/")
    }catch(error)
    {
      console.log("Error creating note",error)
      if(error.response.status===429)
      {
      toast.error("Slow down!You are creating too fast",{
        duration:4000,
        
      })
      }else{
        toast.error("Failed to create note")
      }
    }finally{
      setLoading(false)
    }
  }

  
  return (
    <div className="min-h-screen bg-transparent">

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
          <ArrowLeftIcon className="size-5"></ArrowLeftIcon>Back to notes</Link>
          <div className="card  bg-base-100">
            <div className="card-body">
              <h2 className={"card-title text-2xl mb-4"}>Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input type="text"
                  placeholder="Note Title"
                  className="input input-bordered" 
                  value={title}
                  onChange={(e)=>setTitle(e.target.value)}/>
                  </div>

                  <div className="form-control mb-4">
                   <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                  placeholder="Write your content here..."
                  className="textarea textarea-bordered h-34" 
                  value={content}
                  onChange={(e)=>setContent(e.target.value)}/>
                 
                </div>
                <div className="card-actions justify-end">
                  <button type="submit" className="btn  border border-[#42c895] text-[#00FF9D]" disabled={loading}>
                    {loading?"Creating......":"Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage