const User = require("../#models/User")
const jwt = require('jsonwebtoken')

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
            if(err) {
                console.log(err.message)
                res.locals.user = null
                next()
            } else {
                console.log(decodedToken)
                let user = await User.findById(decodedToken.id)
                res.locals.user = user
                next()
            }
        })
        }
        else {
            res.locals.user = null
            next()
        }
    }


module.exports = checkUser