import React from 'react'
import '../index.css'
import { Link } from 'react-router-dom' // FIXED: use react-router-dom, not 'react'
import { PlusIcon } from 'lucide-react'

const Navbar = () => {
  return (
    <header className="bg-black/10 backdrop-blur-md text-white px-4 py-2 rounded-xl">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight neon-text">
            MindBoard
          </h1>
          <div className="flex items-center gap-4">
            <Link
              to="/create"
              className="flex items-center gap-2 border border-[#00FF9D] text-[#00FF9D] hover:bg-[#00FF9D20] px-4 py-2 rounded-md transition duration-200"
            >
              <PlusIcon className="size-5" />
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
