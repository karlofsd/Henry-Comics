const server = require('express').Router();
const {Orden, LineaDeOrden, Product, User} = require('../db.js');
const {Sequelize:{Op}} = require('sequelize')
const {isAdmin, isAuthenticated} =require('../middleware/helper');

server.get('/:id',(req,res) => {
    let {id} = req.params
    Orden.findAll({where: {id}, include: [Product, User]})
    .then(order => res.status(200).json(order))
    .catch(err => res.status(404).json(err))
})

server.put('/:id',(req,res) => {
    let {status} = req.query
    let {id} = req.params
    Orden.update({status},{where: {id}})
    .then(order => res.status(201).json({message:`orden ${status}`,order}))
    .catch(err => res.status(400).json(err))
})

//S44 ruta que devuelve todas las ordenes 
server.get('/', (req, res) => {
  const { status,userId } = req.query;
  if (status) {
    Orden.findAll(
      {
        where: {status},
        include: [Product, User]  
      }
    )
    .then((orders) => {
        res.status(200).json(orders);
    })
    .catch((err) => {
      res.status(404).json({message: err})
    })
  } else {
    Orden.findAll(
      {        
        include: [Product, User]        
      }
    )
    .then((orders) => {
        res.status(200).json(orders);
    })
    .catch((err) => {
      res.status(404).json({message: err})
    })
  }
});

// ordenes para un usuario especifico
server.get('/user/:userId', isAuthenticated, (req, res) => {
  const { status} = req.query;
  let {userId} = req.params
  if (status) {
    Orden.findAll(
      {
        where: {status,userId},
        include: [Product, User]  
      }
    )
    .then((orders) => {
        res.status(200).json(orders);
    })
    .catch((err) => {
      res.status(404).json({message: err})
    })
  } else {
    Orden.findAll(
      { 
        where: {userId},    
        include: [Product, User]        
      }
    )
    .then((orders) => {
        res.status(200).json(orders);
    })
    .catch((err) => {
      res.status(404).json({message: err})
    })
  }
});

module.exports = server;
