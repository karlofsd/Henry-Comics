const server = require('express').Router();
const { User } = require('../db');


server.get('/', (req, res, next)=>{
User.findAll()
    .then(users => {
        res.send(users);
    })
    .catch(next);
})



server.post("/user/add", function (req, res) {
    var { firstname, lastname, username, email, password } = req.body;
    User.create(
      {
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email,
        password: password,
      },
      {
        fields: ["firstname", "lastname", "username", "email", "password"],
      }
    )
      .then(function (user) {
        res.status(200).json({ message: "Se creo correctamente el usuario", data: user });
      })
      .catch(function (err) {
        res.status(404).json({ err: "No se pudo crear el usuario", data: err });
      });
  });

  server.put("/:id/", function (req, res) {
    const { id, firstname, lastname, username, email, password } = req.body;
    User.update(
      {
        firstname: firstname,
        username: username,
        lastname: lastname,
        email: email,
        password: password
      },
      {
        where: {
          id: id,
        },
        returning: true,
      }
    ).then( (response) =>
       {
      res.status(200).json({ response, message: "Se cambio con exito"  })
    }
    ).catch( (err) => 
    {
      res.status(500).json({ err, message: "No se pudo cambiar" });
    }
    )
  });

  server.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    User.destroy({
      where: { id: id },
    }).then((removed) => {
      if (removed) {
      res.status(200).end();
      } else {
      res.status(404).json({ message: "Not found" });
      }
    });
    });
    
  // server.post("/login", function (req, res) {
  //   var { email, password } = req.body;
  //   User.findOne({
  //     where: {
  //       email,
  //     },
  //   })
  //     .then(function (user) {
  //       bcrypt.compare(password, user.password).then(function (bool) {
  //         if (bool) {
  //           const token = jwt.sign({ email, password }, "...");
  //           res.json({ message: "Se logueo el usuario", data: { token, user } });
  //         } else {
  //           res
  //             .status(404)
  //             .json({ success: false, message: "password incorrecta" });
  //         }
  //       });
  //     })
  //     .catch(function (err) {
  //       res
  //         .status(403)
  //         .json({ message: "No se encontro el usuario.", data: err });
  //     });
  // });

server.delete('/user/:idUser/cart',(req, res)=>{
  const {idUser} = req.params;
  const item = req.body;

  Orden.findAll({
    where: {
      userId: idUser,
      status:'carrito',
      priceNow:0
    }
    })
    .then(carrito=>{
      LineaDeOrden.destroy({
        where: {
          productId: item.id, 
          ordenId:carrito[0].id}
        })
        .then(resp=>{
          res.status(200).json({ message: "success" });
        })
        .catch(error=>{
          res.status(404).json({ message: "Not found" });
        })
    })
    .catch(error=>{
      res.status(404).json({ message: "Not found" });
    });
});

server.put('/user/:idUser/cart',(req, res)=>{
  const {idUser} = req.params;
  const item = req.body;

  Orden.findAll({
      where:{
          userId: idUser,
          status:'carrito',
          priceNow:0
      }
  })
  .then(carrito=>{
    LineaDeOrden.update(
      {
        quantity: item.quantity
      },
      {
        where: {
          ordenId: carrito[0].id, 
          productId: item.id
        }
      })
      .then(resp=>{
        res.status(200).json({ message: 'success' });
      })
      .catch(error=>{
        res.status(404).json({ message: 'Not found',error });
      })
    })
    .catch(error=>{
      res.status(404).json({ message: "Not found" , error});
    })
})  


module.exports = server;