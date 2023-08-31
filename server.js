const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config() // has to be above where set variable for DB 
const dbUrl = process.env.MONGODB_URL
const { expressjwt } = require('express-jwt')
const path = require('path')


app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "client", "build")))

//mongoose.set('strictQuery', true),  
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to the DB')
    })
    .catch(error => {
        console.error('Error connecting to DB: ', error)
    })    

//app.use('/api/owners', require('./routes/ownerRouter.js'))
app.use('/api/auth', require('./routes/authRouter.js'))
// app.use('/api/api', expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] }))
// app.use('/api/api/pets', require('./routes/petRouter.js'))
app.use('/api', expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] }))
app.use('/api/pets', require('./routes/petRouter.js'))

app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === 'UnauthorizedError'){
      res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})

app.listen(8000, () => {
    console.log('The server is running on Port 8000')
})
