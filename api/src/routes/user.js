const server = require('express').Router();
const { User } = require('../db');


server.get('/', (req, res, next)=>{
User.findAll()
    .then(users => {
        res.send(users);
    })
    .catch(next);
})

server.post('/')