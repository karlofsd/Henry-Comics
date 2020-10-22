const server = require('express').Router();
const { User, Orden, LineaDeOrden, Product } = require('../db');
const bcrypt = require('bcrypt')
const passport = require('passport');

server.get('/', (req, res, next)=>{
User.findAll()
    .then(users => {
        res.send(users);
    })
    .catch(next);
})


server.post('/login',(req, res, next)=>{
  passport.authenticate('local',{session:true},(err, user, info)=>{
    if(err){
      res.status(500).json({message:'error'})
      return;
    }
    if(!user){
      res.status(401).json({message:'user'})
      return;
    }

    req.login(user,(error)=>{
      if(error){
        res.status(500).json({message:'no guardado'})
        return;
      }
      //console.log(req.user, 'user!!!')
      res.status(200).json({errors:false, user:user})
    })
  })(req, res, next)
})

// server.post('/login',
//   passport.authenticate('local', { successRedirect: '/user', failureRedirect: '/login', failureFlash: true }),(req, res, next)=>{
//   //
//   console.log(req.user)
//   res.json(req.user)
  
//   /* const {email, password} = req.body;
//   console.log(req.body, 'body');
  
//   User.findOne({
//     where:{
//       email: email,
//       password: bcrypt.hashSync(password,10)
//     }
//   })

//       .then(user => {
//         console.log(user, 'users');
        
//           res.json({
//             id: user.id,
//             email: user.email,
//             isAdmin: user.isAdmin
//           });
//       })
//       .catch((err) => {
//         console.log(err);
        
//       }); */
// })

server.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/')
  res.send({ success: true })
})

server.post("/add", function (req, res) {
    var { firstname, lastname, username, email, password } = req.body;
    User.create(
      {
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email,
        password: bcrypt.hashSync(password,10)
      }
    )
      .then(function (user) {
       
        Orden.create({
          userId: user.id,
          status:'carrito'
        })

        res.status(200).json({ message: "Se creo correctamente el usuario", data: user });
      })
      .catch(function (err) {
        res.status(404).json({ err: "No se pudo crear el usuario", data: err });
      });
  });

  server.put("/:id/", function (req, res) {
    let {id} = req.params
    const { firstname, lastname, username, email, password, image, telefono} = req.body;
    User.update(
      {
        firstname: firstname,
        username: username,
        lastname: lastname,
        email: email,
        password: password,
        image: image,
        telefono: telefono
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

server.delete('/:idUser/cart/:idProduct',(req, res)=>{
  const {idUser, idProduct} = req.params;
  
  Orden.findAll({
    where: {
      userId: idUser,
      status: 'carrito'
    }
    })
    .then(carrito=>{
      LineaDeOrden.destroy({
        where: {
          productId: idProduct,
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

server.put('/:idUser/cart',(req, res)=>{
  const {idUser} = req.params;
  const item = req.body;

  Orden.findAll({
      where:{
          userId: idUser,
          status:'carrito'
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

  //Crea un nuevo carro al usuario si no esta creado y sube productos.
  server.post('/:idUser/cart',(req, res)=>{
    const {idUser} = req.params;
    const item = req.body;
    let stock;

    Product.findByPk(item.id)
      .then(res=>{
        stock= res.stock;
      })

    Orden.findOrCreate({
        where:{
            userId: idUser,
            status:'carrito'
        }
    }).then(ress=>{
        LineaDeOrden.findOrCreate({
            where:{
                productId:item.id,
                ordenId: ress[0].id,
                price: item.price,
            }
        })
        .then(resp =>{
            if(resp[0].quantity>= stock){
              res.status(404).send('Producto supera el stock')
              return;
            }
            if(resp[1]===false){
                LineaDeOrden.increment(
                    {quantity: +1},
                    {where:{productId:item.id, ordenId:resp[0].ordenId}}
                )
                .then(respuesta=>{
                    res.send(respuesta);
                })
                .catch(err=>{

                  res.status(404).json({ message: "Not found" });
                })
            }else{
                res.send(resp)
            }
        })
        .catch(err=>{
            res.json(err)
        })
    })

});

//Trae todos los producto del carrito
server.get('/:idUser/cart',(req,res)=>{
    const {idUser} = req.params;

    Orden.findOne({
        where:{userId:idUser, status:'carrito'},
        include:Product
    })
    .then(ress=>{
        res.json(ress)
    })
    .catch(err=>{
       res.status(404).json({ message: "Not found" });
    })
});

// S45 ruta que devuelve todas las ordenes de un usuario
server.get('/:id/orders', (req, res) => {
  const { id } = req.params;

  Orden.findAll({
    where:{
      userId: id
    },
    include: Product
  })
  .then((order) => {
    res.status(200).json(order)
  })
  .catch((err) => {
    res.status(404).json({message: err})
  })
});

server.post('/', (req, res) => {
  const { email } = req.body;

  User.findOne({where: {email}})
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((err) => {
      console.log(err);      
    })
})
// conseguir un usuario
server.get('/:id',(req,res) => {
  User.findByPk(req.params.id)
  .then(user => res.status(200).json(user))
  .catch(err => res.status(404).json(err))
})
// eliminar producto desde una orden ya comprada
server.delete('/order/:ordenId/product/:productId',(req,res) => {
  let {ordenId,productId} = req.params
  LineaDeOrden.destroy({where:{ordenId,productId}})
  .then(eliminado => res.status(200).json({message:'se elimino el producto',eliminado}))
  .catch(err => res.status(404).json(err))
})

//70 Resetear un Password y bcrypt el password
server.post('/:id/passwordReset', (req, res) =>{
  const { id } = req.params;
  const { password } = req.body;
  User.findByPk(id)
  .then(user =>{
    console.log(user);
    user.update({
      password: bcrypt.hashSync(password, 10)
    })
    res.status(200)
    .json({message: 'Password Receteada'})
  })
  .catch(err=>{
    res.status(404)
    .json({message: 'Not Found', err})
  })
})
  module.exports = server;
