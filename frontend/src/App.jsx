import React from 'react'
import { Route, Routes, useLocation } from "react-router-dom"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import NotePage from "./pages/NotePage"
// import toast from 'react-hot-toast'

import Navbar from './components/Navbar' 
import './index.css'


const App = () => {
  const location = useLocation();
  
  // List of paths where Navbar should be hidden
  const hideNavbarPaths = ["/note"];
  const shouldHideNavbar = hideNavbarPaths.some(path =>
    location.pathname.startsWith(path))
  return (
    <div className="relative size-full">
        <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
      {/* <button onClick={() => toast.success("Congrats")} className='btn btn-outline block mb-2'>Follow me!</button> */}
          {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage/>}/>
            <Route path="/create" element={<CreatePage/>}/>
                <Route path="/note/:id" element={<NotePage/>}/>
      </Routes>
    </div>
  )
}

export default App