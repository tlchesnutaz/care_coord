import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AxiosContext } from "../context/AxiosContext"


export default function Navbar() {

  const { logout } = useContext(AxiosContext)
  const navigate = useNavigate()

  return (
    <div className="navbar">
      <button onClick={() => navigate("../petcard")}>
        Your Pets
      </button>
      <button onClick={() => navigate("../addpetform")}>
        Add A Pet
      </button>
      <button onClick={ logout }>
        Logout
      </button>
    </div>
  )
}