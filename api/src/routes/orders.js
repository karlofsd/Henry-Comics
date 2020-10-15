const server = require('express').Router();
const {Orden} = require('../db.js');

server.get('/:id',(req,res) => {
    let {id} = req.params
    Orden.findByPk(id)
    .then(order => res.status(200).json(order))
    .catch(err => res.status(404).json(err))
})

server.put('/:id',(req,res) => {
    let {status} = req.query
    let {id} = req.params
    Orden.update({status},{where: id})
    .then(order => res.status(201).json({message:`orden ${status}`,order}))
    .catch(err => res.status(400).json(err))
})

module.exports = server;
