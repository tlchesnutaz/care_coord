import React, { useState, createContext } from "react"
import axios from "axios"

const AxiosContext = createContext()
const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("token")
  config.headers.Authorization = `Bearer ${token}`
  return config
})

function AxiosContextProvider(props) {
  const initState = { 
    user: JSON.parse(localStorage.getItem("user")) || {}, 
    token: localStorage.getItem("token") || "", 
    errMsg: "",
  }
    
  const [userState, setUserState] = useState(initState)
  const [pets, setPets] = useState([])
    
  function signup(credentials){
    axios.post('/api/auth/signup', credentials)
      //.then(res => console.log(res.data)) //res.data has user info and token
      .then(res => {
        const { user, token } = res.data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        setUserState(prevUserState => ({
            ...prevUserState, 
            user,
            token
        }))
      })
      // .catch(err => console.dir(err)) will log the err as an object so can see all the properties of it
      .catch(err => handleAuthErr(err.response.data.errMsg))
  }

  function login(credentials){
    axios.post('/api/auth/login', credentials)
      // .then(res => console.log(res))
      .then(res => {
        const { user, token } = res.data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        setUserState(prevUserState => ({
          ...prevUserState, 
          user,
          token
        }))
      })
      // .catch(err => console.dir(err))
      .catch(err => handleAuthErr(err.response.data.errMsg))
  }

  function logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUserState({
      user: {},
      token: "",
    })
  }

  function handleAuthErr(errMsg){
    setUserState(prevUserState => ({
      ...prevUserState,
      errMsg
    }))
  }

  function resetAuthErr(){
    setUserState(prevUserState => ({
      ...prevUserState,
      errMsg: ""
    }))
  }

  // create function for getAllPets
  // and rename this getUserPets?
  function getPets(){
    userAxios.get(`/api/pets/user`)
      //.then(res => console.log(res.data))
      .then(res => setPets(res.data))
      .catch(err => console.log(err))
  }
    
  function addPet(newPet){
    // console.log(newPet)
    userAxios.post(`/api/pets`, newPet)
      .then(res => {
          setPets(prevPets => [...prevPets, res.data])
      })
      .catch(err => console.log(err))
  }
  
  function deletePet(petId){
    userAxios.delete(`/api/pets/${petId}`)
      .then(res => setPets(prevPets => prevPets.filter(pet => pet._id !== petId)))                          
      .catch(err => console.log(err))
  }  
  
  function updatePet(petId, updates){
    userAxios.put(`/api/pets/${petId}`, updates)
      //.then(res => {console.log(res)}) // this is where it will update setPets
      .then(res => {
          setPets(prevPets => prevPets.map(pet => (pet._id !== petId ? pet : res.data)))
      })
      .catch(err => console.log(err))
  }

  return(
    <AxiosContext.Provider 
      value={{
        ...userState,
        signup,
        login,
        logout,
        resetAuthErr,
        pets,
        getPets,
        addPet,
        deletePet,
        updatePet
      }}
    >
        {props.children}
    </AxiosContext.Provider>
  )
}

export {AxiosContext, AxiosContextProvider}