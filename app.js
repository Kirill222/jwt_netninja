const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./#routes/authRoutes')
const cookieParser = require('cookie-parser')

const app = express()

// middleware
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs')

// database connection
const dbURI = 'mongodb+srv://kirill:kirill@cluster0.w7dqn.mongodb.net/jwt_netninja?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true }, () => console.log('DB connected'))
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err))

// routes
app.get('/', (req, res) => res.render('home'))
app.get('/smoothies', (req, res) => res.render('smoothies'))
app.use(authRoutes)

// cookies
app.get('/set-cookies', (req, res) => {
  //res.setHeader('Set-Cookie', 'newUser=true') //classic, old way to set cookie
  res.cookie('newUser', false) //set cookie with cookie-parser library
  res.cookie('isEmployee', true, {maxAge: 1000*60*60*24}) //the third argument is the time of cookie to exist
  res.send('you got the cookie')
})

app.get('/read-cookies', (req, res) => {
  const cookies = req.cookies
  console.log(cookies)
  res.json(cookies.newUser)
})