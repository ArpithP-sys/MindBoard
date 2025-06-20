import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from "../lib/utils"
import axios from 'axios'
import toast from 'react-hot-toast'
import BASE_URL from '../lib/config'
import USER_ID from '../lib/user' // ✅ Import current user ID

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault()

    if (!window.confirm("Do you want to delete this note? Are you sure?")) return;

    try {
      await axios.delete(`${BASE_URL}/${id}`, {
        data: { userId: USER_ID } // ✅ Send userId in request body
      })
      setNotes((prev) => prev.filter(note => note._id !== id)) // Remove deleted note from state
      toast.success("Note deleted successfully!")
    } catch (error) {
      console.error("Error in handleDelete:", error)
      toast.error("Failed to delete note")
    }
  }

  return (
    <Link to={`/note/${note._id}`} className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-[#00FF9D]">
      <div className="card-body">
        <h3 className='card-title text-base-content'>{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {note.createdAt ? formatDate(note.createdAt) : "Date not available"}
          </span>

          {/* ✅ Edit/Delete only shown if current user owns the note */}
          {note.userId === USER_ID && (
            <div className="flex items-center gap-1">
              <Link to={`/note/${note._id}`}>
                <PenSquareIcon className="size-4" />
              </Link>
              <button
                className="btn btn-ghost btn-xs text-error"
                onClick={(e) => handleDelete(e, note._id)}
              >
                <Trash2Icon className='size-4' />
              </button>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default NoteCard
