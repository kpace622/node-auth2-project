const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const authRouter = require('./auth/auth-router');
const userRouter = require('./users/user-router');

const server = express();

server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
    res.send('working!')
})

module.exports = server;