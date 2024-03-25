import React, { useContext } from "react"
import { AxiosContext } from "../context/AxiosContext.jsx"


export default function AuthForm(props){
  
  const { token } = useContext(AxiosContext)
  
  const {
    handleChange, 
    handleSubmit, 
    btnText, 
    errMsg,
    inputs: {
      username, 
      password
    }, 
    pText
  } = props
  
  return (
    
    <form className="auth-form" onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={username} 
        name="username" 
        onChange={handleChange} 
        placeholder="Username"
      />
      <input 
        type="text" 
        value={password} 
        name="password" 
        onChange={handleChange} 
        placeholder="Password"
      />
      { !token && <button className="auth-button">{ btnText }</button> }
      { !token && <p className="auth-info">{ pText }</p> }
      <p style={{color: "white"}}>{ errMsg }</p>
    </form>
   
  )
}