const express = require('express')
const authRouter = express.Router()
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')


// signup (adjusted for new mongoose)
authRouter.post("/signup", (req, res, next) => {
  User.findOne({ username: req.body.username.toLowerCase() }) 
  .then(user => {
    if (user) {
      res.status(403)
      return next(new Error("that username is already in use"))
    }     
    const newUser = new User(req.body)
    newUser.save()
    .then(savedUser => {
      const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
      res.status(200).send({ token, user: savedUser.withoutPassword() })
    })
    .catch(err => {
      res.status(500)
      return next(err)
    })
  })
  .catch(err => {
    res.status(500)
    return next(err)
  })
})

// login  (adjusted for new mongoose)
authRouter.post("/login", (req, res, next) => {
   User.findOne({ username: req.body.username.toLowerCase() })
//     .then(user => {
//         if(!user){
//             res.status(403)
//             return next(new Error("Username or Password are incorrect"))
//         }
//         if(req.body.password !== user.password){
//             res.status(403)
//             return next(new Error("Username or Password are incorrect"))
//         }
//         const token = jwt.sign(user.toObject(), process.env.SECRET)
//         res.status(200).send({ token, user })
//     })
//     .catch(err => {
//         res.status(500)
//         return next(err)
//     })
// })
// replace with the following to incorp encryption w bcrypt
    .then(user => {
      if (!user) {
        res.status(403)
        throw new Error("Username or Password are incorrect")
      }
      return user.checkPassword(req.body.password)
      .then(isMatch => {
        if (!isMatch) {
          res.status(403)
          throw new Error("Username or Password are incorrect")
        }
        const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
        res.status(200).send({ token, user: user.withoutPassword() })
      })
      .catch(err => {
        res.status(403)
        return next(new Error("Username or Password are incorrect"))
      })
    })
    .catch(err => {
      res.status(500)
      next(err)
    })  
  })

module.exports = authRouter