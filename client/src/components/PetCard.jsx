import React, { useState, useContext } from "react"
import { AxiosContext } from "../context/AxiosContext"
import moment from "moment"
import EditForm from "./EditForm"

export default function PetCard(props){

  const { deletePet } = useContext(AxiosContext)
  const { pet } = props
  const [toggleEdit, setToggleEdit] = useState(false)

  function handleToggle() {
    setToggleEdit(!toggleEdit)
  }

  return (
    <div className="pet-card" key={pet._id}>
      {!toggleEdit &&
        <>
          <p>Name: {pet.petName}</p>
          <p>Type: {pet.species}: {pet.specific}</p>
          <p>
            DOB:
            {pet.dob
              ? moment(pet.dob).format(' MM-DD-YYYY')
              : ' Unknown'}
          </p>
          <p>
            Date acquired:{' '}
            {pet.acquired
              ? moment(pet.acquired).format(' MM-DD-YYYY')
              : ' empty'}
          </p>
          <p>Gender: {pet.gender}</p>
          <p>Neutered: {pet.neutered}</p>
          <p>{pet.chipNum ? `MicroChip Number: ${pet.chipNum}` : ' '}</p>
          <p>
            {pet.lastVac
              ? `Last Vaccination Date: ${moment(pet.lastVac).format(' MM-DD-YYYY')}` : ' '}
          </p>
          <p>Vet: {pet.vetName}</p>
          <p>Vet Phone #: {pet.vetPhone}</p>
          <p>Notes: {pet.notes}</p>
          <p>Owner: {pet.owner}</p> {/* how to render Owner's name? */}
          <button onClick={() => setToggleEdit(!toggleEdit)}>Edit</button>
          <button onClick={() => deletePet(pet._id)}> Remove </button>      
        </>
      }     
      {toggleEdit &&
        <>
          <EditForm pet={pet} handleToggle={handleToggle} />
        </>
      }  
    </div>
  )
}