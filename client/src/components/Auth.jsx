import React, { useState, useContext } from "react"
import AuthForm from "./AuthForm.jsx"
import { AxiosContext } from "../context/AxiosContext.jsx"
// import { redirect } from "react-router-dom"


const initInputs = { username: "", password: "" }

export default function Auth(){

  const [inputs, setInputs] = useState(initInputs)
  const [toggle, setToggle] = useState(false)

  /* instead of const = userData - we don't need all, so just destruct what we do */
  const { signup, login, errMsg, resetAuthErr, token } = useContext(AxiosContext)

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
    <>
      <h1 className="title"> Pet Care Coordinator </h1>
      <p className="subtitle"> Let us help you 'tame' your pet care to-dos! </p>
      <div className="login">
        { !toggle ?
          <>
            <AuthForm 
              handleChange={handleChange}
              handleSubmit={handleSignup}
              inputs={inputs}
              btnText="CREATE ACCOUNT"
              errMsg={errMsg}
              pText="Already have an account?"
            />
            { !token && <p className="account" onClick={toggleForm} style={{color:'red'}}> Go to Sign In </p> }
          </>
        :
          <>
            <AuthForm 
              handleChange={handleChange}
              handleSubmit={handleLogin}
              inputs={inputs}
              btnText="SIGN IN"
              errMsg={errMsg}
              pText="Need to create an account?"
            />
            { !token && <p className="account" onClick={toggleForm} style={{color:'red'}}> Register Here </p> }
          </>
        }
      </div>
    </>
  )
}


{/* <p className="slider"> slider of images of animals or personal upload </p> */}