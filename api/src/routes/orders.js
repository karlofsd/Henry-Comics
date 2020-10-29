const server = require('express').Router();
const {Orden, LineaDeOrden, Product, User, Checkout} = require('../db.js');
const {Sequelize:{Op}} = require('sequelize')
const {isAdmin, isAuthenticated} =require('../middleware/helper');
const linkPago = require('../middleware/mercadopago');

//-----------------------NodeMailer
const nodemailer = require('nodemailer');
const path = require('path');
const hbs = require('nodemailer-express-handlebars');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:'henrycomicsarg@gmail.com',
    pass: 'ecommerceg8'
  }
})

const handlebarOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.resolve(__dirname, "views"),
    defaultLayout: false,
  },
  viewPath: path.resolve(__dirname, "views"),
  extName: ".handlebars",
};

transporter.use(
  "compile",
  hbs(handlebarOptions)
);

server.get('/:id',(req,res) => {
    let {id} = req.params
    Orden.findAll({where: {id}, include: [Product, User, Checkout]})
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
        include: [Product, User,Checkout]  
      }
    )
    .then((orders) => {
      console.log('ordenes',orders)
        res.status(200).json(orders);
    })
    .catch((err) => {
      res.status(404).json({message: err})
    })
  } else {
    Orden.findAll(
      {        
        include: [Product, User, Checkout]        
      }
    )
    .then((orders) => {
      console.log('ordenes',orders[0].checkouts)
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
        include: [Product, User, Checkout]  
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
        include: [Product, User, Checkout]        
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

// CHECKOUT

server.post('/:id/checkout',(req,res) => {
  let body = req.body
  let {id} = req.params
  console.log('body',body)
  Checkout.create(body)
  .then(check => {
    console.log('checkout',check)
    Orden.findByPk(id)
    .then(order => { 
      console.log('orden',order)
      order.addCheckouts(check.id)
      .then( response =>{
        console.log('respuesta',response)
        // aca se manda el mail
        let mailOptions = {
          from: 'henrycomicsarg@gmail.com',
            to: req.body.email,
            subject: 'Henry Comics',
            text: 'Bienvenido',
            template: 'checkout',
            //context:{
              //nombre: req.body.username
            //}
          };
          transporter.sendMail(mailOptions, (err, data)=>{
            if(err){
              console.log('error', err);
            }else{
              console.log('Enviado');
            }
          });
        res.status(201).json({message:'Compra Exitosa!',response})
      })
    })
  })
  .catch(err => res.status(400).json(err))
})

server.delete('/checkout/:id',(req,res) => {
  let {id} = req.params
  Checkout.destroy({where: {id}})
  .then(deleted => res.status(200).json({message:'checkout eliminado',deleted}))
  .catch(err => res.status(404).json(err))
})

// server.get('/checkout/:id',(req,res) => {
//   let {id} = req.params
//   Checkout.findByPk(id,{include: Orden})
//   .then(check => res.status(200).json(check))
//   .catch(err => res.status.json(err))
// })

// Mercado Pago

server.post('/api/v1/mercadopago',linkPago,(req,res) => {
  try{
    res.send('ok')
  }catch(err){
    res.json(err)
  }
})

server.put('/payment/:id',(req,res) => {
  let {status} = req.query
  let {id} = req.params
  Checkout.update({status:status},{where:{id}})
  .then(check => res.status(200).json({message:'operación exitosa',check}))
  .catch(err => res.status(404).json(err))
})

module.exports = server;
