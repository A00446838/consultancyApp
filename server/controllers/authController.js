const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = (req, res, next) => {
    bcryptjs.hash(req.body.password, 9, function (err, hashedPassword) {
        if (err) {
            res.json({ error: err })
        }
        let user = new User({
            userType: req.body.userType,
            consultancyType: req.body.consultancyType,
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        user.save().then(response => {
            res.json({
                message: 'Await User Authorization from Admin'
            })
        }).catch(err => {
            res.json({
                message: 'Error!!!'
            })
        })
    })
}

const login = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    User.findOne({ email: username }).then(user => {
        if (user && user.isActive) {
            console.log(user)
            bcryptjs.compare(password, user.password, function (err, result) {
                if (err) {
                    res.json({ error: err })
                }
                if (result) {
                    let token = jwt.sign({ name: user.name }, 'consultancyAppSecret', { expiresIn: '1h' })
                    User.findOneAndUpdate({ email: username }, { $set: { activeToken: token } }).then().catch()
                    res.json({
                        message: 'Success Login',
                        token
                    })
                } else {
                    res.json({
                        message: 'Password Mismatch'
                    })
                }
            })
        }
        else {
            if (!user.isActive)
                res.json({ message: 'User not active' })
            else
                res.json({ message: 'No user' })
        }
    }).catch(err => {
        res.json({ message: 'Error!!!' })
    })

}

module.exports = {
    login, register
}