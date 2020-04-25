const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        res.status(401).json({message: 'missing token'})
    } else if (token) {
        jwt.verify(token, 'mysecret', (err, decodedToken) => {
            if (err) {
                res.status(401).json({message: 'You shall not pass!'})
            } else {
                req.decodedToken = decodedToken;
                next()
            }
        })
    }
};