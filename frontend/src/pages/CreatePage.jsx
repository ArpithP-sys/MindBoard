import { ArrowLeftIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import BASE_URL from '../lib/config'
import USER_ID from '../lib/user'

const CreatePage = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!title.trim() || !content.trim()) {
    toast.error("Please enter both title and content");
    return;
  }

  setLoading(true);
  try {
    await axios.post(`${BASE_URL}`, {
      title,
      content,
      userId: USER_ID,  // ✅ user identification
    });
    toast.success("Note created successfully!");
    navigate("/");
  } catch (error) {
    console.log("Error creating note", error);
    if (error.response && error.response.status === 429) {
      toast.error("Slow down! You're creating notes too fast", {
        duration: 4000,
      });
    } else {
      toast.error("Failed to create note");
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-transparent">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />Back to notes
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    placeholder="Write your content here..."
                    className="textarea textarea-bordered h-34"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn border border-[#42c895] text-[#00FF9D]"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Note"}
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
