
const User = require('../models/user')

const showInActiveUsers = (req, res, next) => {
    User.find({isActive: false}).then(response => {
        res.json({response})
    }).catch(err => {
        res.json({message: 'Error!!!'})
    })
}

const activateUser = (req, res, next) => {
    var user = req.body.user
    User.findOneAndUpdate({email: user}, {$set : {isActive: true}}).then(response => {
        if(response) {
            res.json({message: user + ' activated successfully'})
        } else {
            res.json({message: user + ' not found'})
        }
    }).catch(err => {
        res.json({error: err})
    })
}

const showNonAdmins = (req, res, next) => {
    User.find({ isAdmin: false }).then(response => {
        res.json({ response })
    }).catch(err => {
        res.json({ message: 'Error!!!' })
    })
}

module.exports = {
    showInActiveUsers, activateUser, showNonAdmins
}