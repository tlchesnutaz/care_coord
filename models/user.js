const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')


const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  memberSince: {
    type: Date,
    default: Date.now
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
})

// pre-save hook to encrypt user passwords on signup
userSchema.pre("save", function(next){
  const user = this
  if (!user.isModified("password")) return next()
  bcrypt.hash(user.password, 10, (err, hash) => {
  // 10 is referring to 'salt rounds', how the algo encrypts password, read docs
  if (err) return next(err)
  user.password = hash
  next()
  })
}) 

// method to check encrypted password on login, password attempt is req.body.password
userSchema.methods.checkPassword = function(passwordAttempt) {
  return new Promise((resolve, reject) => {
  bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
    if(err) return reject(err)
    resolve(isMatch)
    })
  }) 
}

// method to remove user's password for token/ sending the response
userSchema.methods.withoutPassword = function(){
  // pull user out and make it a plain js object
  const user = this.toObject()
  delete user.password
  return user
}

module.exports = mongoose.model("User", userSchema)