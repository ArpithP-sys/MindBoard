import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import toast from 'react-hot-toast'
import '../index.css'
import NoteCard from '../components/NoteCard'
import NotesNotFound from '../components/NotesNotFound'
import BASE_URL from '../lib/config'
import USER_ID from '../lib/user'

const HomePage = () => {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let userId = localStorage.getItem("userId");
  if (!userId) {
    userId = prompt("Enter your user ID (e.g.,1234):");
    if (userId) localStorage.setItem("userId", userId);
  }
    const fetchNotes = async () => {
      try {
        const res = await axios.get(`${BASE_URL}?userId=${USER_ID}`)
        console.log(res.data)
        setNotes(res.data)
      } catch (error) {
        console.log("Error fetching notes:", error)
        if (error.response && error.response.status === 429) {
          toast.error("Too many requests. Please try again later.")
        } else {
          toast.error("Failed to load notes.")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [])

  return (
    <div className='min-h-screen'>
      <div className='container mx-auto p-4'>
        <h1 className='text-3xl font-bold mb-4'>Notes</h1>

        {loading ? (
          <p>Loading...</p>
        ) : notes.length === 0 ? (
          <NotesNotFound />
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {notes.map(note => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
