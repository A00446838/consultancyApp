const User = require('../models/user')
const Query = require('../models/query')

const ask = (req, res, next) => {
    let consultant = req.body.consultant
    Query.find({consultantEmail: consultant}).then(response => {
        if(response) {
            res.json({response})
        } else {
            res.status(404)
            res.json({message: 'No queries found'})
        }
    }).catch(err => {
        res.status(500)
        res.json({message: 'Error'})
    })
}