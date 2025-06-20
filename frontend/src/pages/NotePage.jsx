import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { ArrowLeftIcon, Loader2Icon, Trash2Icon } from 'lucide-react'
import '../index.css'
import BASE_URL from '../lib/config'
import USER_ID from '../lib/user'

const NotePage = () => {
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/${id}?userId=${USER_ID}`)
        setNote(res.data)
      } catch (error) {
        console.log("Error in fetching note", error)
        toast.error("Failed to fetch the note")
      } finally {
        setLoading(false)
      }
    }
    fetchNote()
  }, [id])

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content")
      return
    }

    setSaving(true)
    try {
      await axios.put(`${BASE_URL}/${id}`, {
        title: note.title,
        content: note.content,
        userId: USER_ID,
      })
      toast.success("Note updated successfully")
      navigate('/')
    } catch (error) {
      console.error("Error saving note:", error)
      toast.error("Failed to save changes")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return

    try {
      await axios.delete(`${BASE_URL}/${id}`, {
        data: { userId: USER_ID },
      })
      toast.success("Note deleted successfully")
      navigate("/")
    } catch (error) {
      console.log("Error deleting the note:", error)
      toast.error("Failed to delete note")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <Loader2Icon className="animate-spin duration-1000 size-10" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-200 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to notes
            </Link>
            {note.userId === USER_ID && (
              <button onClick={handleDelete} className="btn btn-error btn-outline">
                <Trash2Icon className="h-5 w-5" />
                Delete note
              </button>
            )}
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note Title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                  disabled={note.userId !== USER_ID}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your content here..."
                  className="textarea textarea-bordered h-40"
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                  disabled={note.userId !== USER_ID}
                />
              </div>

              {note.userId === USER_ID && (
                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn border border-[#42c895] text-[#00FF9D]"
                    onClick={handleSave}
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotePage
