import React, { useContext } from "react"
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom"
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Auth from "./components/Auth"
import AddPetForm from "./components/AddPetForm"
import PetList from "./components/PetList"
import Navbar from "./components/Navbar.jsx"
import { AxiosContext } from "./context/AxiosContext.jsx"
import { FaGithub, FaFacebookF, FaInstagram, FaTwitter, FaRegCopyright } from "react-icons/fa"
// install react-icons, info on https://www.npmjs.com/package/react-icons

// FUTURE: allow users to add own pic to home/auth page?
// allow users to upload image of each pet that is displayed on pets page

export default function App() {
  const { token } = useContext(AxiosContext)
  // if token is empty string it will be falsey value
  
  return (

    <Router>
      { token && <Navbar /> }
      <Routes>
        <Route 
          path="/" 
          element={token ? <Navigate to="/petcard"/> : <Auth />}
        />
        <Route 
          path="/addpetform"
          element={<ProtectedRoute token={token} redirectTo="/">
            <AddPetForm />
          </ProtectedRoute>}
        />
        <Route 
          path="/petCard"
          element={<ProtectedRoute token={token} redirectTo="/">
            < PetList/>
          </ProtectedRoute>}
        />
        </Routes>

      <footer>
        <span 
          className="copyright"> Copyright 2023 < FaRegCopyright /> 
            <Link className="footer-logo" to="/" > CareCoordinator </Link> 
        </span>
        <span>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="facebook">< FaFacebookF className="face" /></a> 
          <a href="https://www.github.com" target="_blank" rel="noopener noreferrer" aria-label="github">< FaGithub className="git" /></a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="instagram">< FaInstagram className="insta" /></a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="twitter">< FaTwitter className="twit" /></a>
        </span>
        <p className="disclaimer"> Disclaimer: </p>
      </footer>
    </Router>
      
  )
}