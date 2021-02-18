const User = require('../models/user')
const Query = require('../models/query')

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
        res.status(500)
        res.json({ message: 'Error!!!' })
    })
}

const ask = (req, res, next) => {
    let query = new Query({
        email: req.body.email,
        queryType: req.body.queryType,
        message: req.body.message
    })
    query.save().then(response => {
        res.json({
            message: 'Query submitted successfully'
        })
    }).catch(err => {
        res.status(500)
        res.json({ message: 'Error!!!' })
    })
}

const accept = (req, res, next) => {
    let id = req.body.id
    let consultantEmail = req.body.email
    Query.findOneAndUpdate({_id: id}, {$set: {consultantEmail: consultantEmail}}).then(
        response => {
            if(response) {
                res.json({message: 'Query accepted'})
            }
            else {
                res.status(404)
                res.json({message: 'Query not found'})
            }
        }
    ).catch(err => {
        res.status(500)
        res.json({ message: 'Error!!!' })
    })

}

const showConsultants = (req, res, next) => {
    User.find({ userType: 'Consultant' }).select({'userType': 1, 'consultancyType': 1, 'name': 1,'email': 1})
    .then(response => {
        res.json({ response })
    }).catch(err => {
        res.status(404)
        res.json({ message: 'Error!!!' })
    })
}

module.exports = {
    register, ask, accept, showConsultants
}