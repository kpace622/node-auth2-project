const router = require('express').Router();

const Users = require('./user-model');
const restricted = require('../auth/restricted');

router.get('/', restricted, (req, res) => {
    Users.find()
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            res.status(500).json({message: 'error finding users', err})
        })
})

module.exports = router;