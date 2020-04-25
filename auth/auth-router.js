const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/user-model');

router.post('/register', (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.post('/login', (req, res) => {
    const {username, password} = req.body;

    Users.findBy({ username })
    .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({message: `Welcome ${user.username}`, token})
            } else {
                res.status(401).json({message: 'You shall not pass!'})
            }
        })
        .catch(err => {
            res.status(500).json({message: 'error logging in'})
        })
})

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
    };
    const secret = 'mysecret';
    const options = {
        expiresIn: '1h'
    }

    return jwt.sign(payload, secret, options)
}

module.exports = router;