const express = require("express")
const petRouter = express.Router()
const Pet = require("../models/pet.js")


// Get all pets (modified to work with newest version of mongoose)
petRouter.get("/", (req, res, next) => {
  Pet.find()
    .then(pet => {
      res.status(200).send(pet)
    })
    .catch(err => {
      res.status(500)
      return next(err)
    })
  })

// Get pet(s) by user
petRouter.get("/user", (req, res, next) => { // "/:ownerId"
  Pet.find({ user: req.auth._id  }) // owner: req.params.ownerId
    .then(pets => {
      res.status(200).send(pets)
    })    
    .catch(err => {
      res.status(500)
      next(err)
    })    
})

// Add pet (with connected userId)
petRouter.post("/", (req, res, next) => { // "/:ownerId"
  // req.body.owner = req.params.ownerId
  req.body.user = req.auth._id
  const newPet = new Pet(req.body)
  newPet.save()
    .then(savedPet => {
      res.status(201).send(savedPet)
      res.send( `Successfully added ${newPet.petName} to the db` )
    })
    .catch(err => {
      res.status(500)
      next(err)
    }) 
})

// Update pet
petRouter.put("/:petId", (req, res, next) => {
  Pet.findOneAndUpdate(
    { _id: req.params.petId, user: req.auth._id },
    req.body,
    { new: true }
  )
  .then(updatedPet => {
    if (!updatedPet) {
      res.status(404).send("Pet not found")
      return
    }
    res.status(200).send(updatedPet)
  })
  .catch (err => {
      res.status(500)
      next(err)
    })
})

// Delete pet
petRouter.delete("/:petId", (req, res, next) => {
  Pet.findOneAndDelete({ _id: req.params.petId, user: req.auth._id }) 
    .then(deletedPet => {
      if (!deletedPet) {
        res.status(404).send("Pet not found");
        return
      }
      res.status(200).send(`Successfully removed ${deletedPet.petName} from the DB`)
    })
    .catch(err => {
      res.status(500)
      next(err)
    })
})

module.exports = petRouter