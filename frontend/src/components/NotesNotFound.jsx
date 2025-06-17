import React from 'react'
import { Link } from 'react-router-dom'
import { PlusIcon, NotebookIcon } from 'lucide-react'

const NotesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      <NotebookIcon className="w-20 h-20 text-green-400 mb-4" />
      <h2 className="text-3xl font-semibold text-green-500 mb-2">Your Notebook is Empty</h2>
      <p className="text-base-content/80 mb-6">
        Looks like you haven’t jotted anything down yet.<br />Let’s fill it up with your brilliant thoughts!
      </p>
      <Link
        to="/create"
        className="btn btn-outline border-green-400 text-green-400 hover:bg-green-600 hover:text-white"
      >
        <PlusIcon className="size-5 mr-2" />
        Create Your First Note
      </Link>
    </div>
  )
}

export default NotesNotFound
