const mongoose = require('mongoose')
const {isEmail} = require('validator')

const userSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: [true, 'Please, enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please, enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please, enter a password'],
        minlength: [6, 'Minimum password length is 6 characters'],
    },
})

//MONGOOSE HOOKS - functions that can be fired before or after smth happens
//fire a function after doc saved to the bd
userSchema.post('save', function(doc, next) {                //post - means after
    console.log('new user was created & saved', doc)
    next()
})

//fire a function before doc saved to db
userSchema.pre('save', function(next) {
    console.log('user is about to be created', this)
    next()
})


const User = mongoose.model('user', userSchema)

module.exports = User