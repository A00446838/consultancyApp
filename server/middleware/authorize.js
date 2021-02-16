const jwt = require('jsonwebtoken')

const authorize = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'consultancyAppSecret')

        req.user = decode
        next()
    } catch(err) {
        res.json({
            message: 'Authorization failed'
        })
    }
}

module.exports = authorize