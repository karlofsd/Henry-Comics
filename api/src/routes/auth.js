const server = require('express').Router();
const { User } = require('../db.js');

const {isAdmin, isAuthenticated} =require('../middleware/helper')

server.post('/promote/:id',isAuthenticated, isAdmin, (req, res) => {
  const { id } = req.params;
  User.update(
        {
        isAdmin: true
        },
        {
          where: 
          { 
            id: id
          }
        }    
  ).then((r) => {
    res.status(200).json({message: 'Usuario Promovido'})
  })
    .catch((err) => {
    res.status(400).json({err})
  })
})

server.get('/me',isAuthenticated,(req,res) => {
  res.status(200).json(req.user)
})

module.exports = server;