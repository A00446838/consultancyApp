const User = require('../models/user')

const register = (req, res, next) => {
    let user = new User({
        userType: req.body.userType,
        consultancyType: req.body.consultancyType,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    user.save().then(response => {
        res.json({
            message: 'Please wait for the admin to authorize'
        })
    }).catch(err => {
        res.json({ message: 'Error!!!' })
    })
}

module.exports = {
    register
}