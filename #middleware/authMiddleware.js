const jwt = require('jsonwebtoken')

const requireAuth = (req, res, next) => {

    //grab token from cookie
    const token = req.cookies.jwt

    //check if the token exists and verified
    if(token) {
        jwt.verify(token, 'net ninja secret', (err, decodedToken) => {
            if(err) {
                console.log(err.message)
                res.redirect('/login')
            } else {
                console.log(decodedToken)
                next()
            }
        })
    }
    else {
        res.redirect('/login')
    }

}

module.exports = { requireAuth }