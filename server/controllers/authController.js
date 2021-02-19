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
            res.status(500)
            res.json({
                message: 'Error!!!'
            })
        })
    })
}

const login = (req, res, next) => {
    var username = req.body.email
    var password = req.body.password

    User.findOne({ email: username }).then(user => {
        if (user && user.isActive) {
            console.log(user)
            bcryptjs.compare(password, user.password, function (err, result) {
                if (err) {
                    res.json({ error: err })
                }
                if (result) {
                    let token = jwt.sign({ email: user.email }, 'consultancyAppSecret', { expiresIn: '1h' })
                    User.findOneAndUpdate({ email: username }, { $set: { activeToken: token } }).then().catch()
                    res.json({
                        message: 'Success Login',
                        token
                    })
                } else {
                    res.status(403);
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
        res.status(403);
        res.json({ message: 'Error!!!' })
    })

}

const logout = (req, res, next) => {
    let email = req.body.username
    User.findOneAndUpdate({ email: email }, { $set: { activeToken: '' } }).then(
        response => {
            if (response) {
                res.json({ message: 'Log Out Successful' })
            }
            else {
                res.status(404)
                res.json({ message: 'User Not Found' })
            }
        }
    ).catch(err => {
        res.status(404)
        res.json({ message: err })
    })
}

module.exports = {
    login, register, logout
}