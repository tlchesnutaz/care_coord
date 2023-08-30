import React, { useState, useContext } from "react"
import AuthForm from "./AuthForm.jsx"
import { AxiosContext } from "../context/AxiosContext.jsx"
// import { redirect } from "react-router-dom"


const initInputs = { username: "", password: "" }

export default function Auth(){

  const [inputs, setInputs] = useState(initInputs)
  const [toggle, setToggle] = useState(false)

  /* instead of const = userData - we don't need all, so just destruct what we do */
  const { signup, login, errMsg, resetAuthErr, token, getPets } = useContext(AxiosContext)

  function handleChange(e){
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSignup(e){
    e.preventDefault()
    signup(inputs)
  }

  function handleLogin(e){
    e.preventDefault()
    login(inputs)
  }

  function toggleForm(){
    setToggle(prev => !prev)
    resetAuthErr()
  }

  return (
    <div className="login">
      <h1 className="title"> Pet Care Coordinator </h1>
      <p className="subtitle"> Let us help you 'tame' your pet care to-dos! </p>
      { !toggle ?
        <>
          <AuthForm 
            handleChange={handleChange}
            handleSubmit={handleSignup}
            inputs={inputs}
            btnText="Sign up"
            errMsg={errMsg}
          />
          { !token && <p className="account" onClick={toggleForm}> Have an Account? </p> }
        </>
      :
        <>
          <AuthForm 
            handleChange={handleChange}
            handleSubmit={handleLogin}
            inputs={inputs}
            btnText="Login"
            errMsg={errMsg}
          />
          { !token && <p className="account" onClick={toggleForm}> Create Account </p> }
        </>
      }
      <p className="slider"> slider of images of animals or personal upload </p>
    </div>
  )
}