const server = require('express').Router();
const { User } = require('../db');


server.get('/', (req, res, next)=>{
User.findAll()
    .then(users => {
        res.send(users);
    })
    .catch(next);
})

server.get("/:id", function (req, res) {
    User.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Orden,
          as: "ordenes",
        },
      ],
    })
      .then(function (user) {
        res.status(200).json(user);
      })
      .catch(function (reason) {
        res
          .status(404)
          .json({ message: "No se obtuvo el usuario", data: reason });
      });
  });

server.post("/add", function (req, res) {
    var { name, email, password, adress } = req.body;
    User.create(
      {
        name: name,
        email: email,
        password: password,
        adress: adress,
        role: "user"
      },
      {
        fields: ["name", "email", "password", "adress"],
      }
    )
      .then(function (user) {
        res
          .status(200)
          .json({ message: "Se creo correctamente el usuario", data: user });
      })
      .catch(function (err) {
        res.status(404).json({ err: "No se pudo crear el usuario", data: err });
      });
  });

  server.put("/modify", function (req, res) {
    const { id, name, adress } = req.body;
    User.update(
      {
        name: name,
        adress: adress,
      },
      {
        where: {
          id: id,
        },
        returning: true,
      }
    ).then(function (respuesta) {
      const user = respuesta[1][0];
      res.status(200).json({ message: "Se cambio con exito", data: user });
    });
  });

  server.put("/:id/passwordReset", function (req, res) {
    const { password } = req.body;
    const id = req.params.id;
    var hash = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    User.update(
      {
        password: hash,
      },
      {
        where: {
          id: id,
        },
        returning: true,
      }
    ).then(function (respuesta) {
      const user = respuesta[1][0];
      res.status(200).json({ message: "Se cambio con exito", data: user });
    });
  });

  server.post("/login", function (req, res) {
    var { email, password } = req.body;
    User.findOne({
      where: {
        email,
      },
    })
      .then(function (user) {
        bcrypt.compare(password, user.password).then(function (bool) {
          if (bool) {
            const token = jwt.sign({ email, password }, "...");
            res.json({ message: "Se logueo el usuario", data: { token, user } });
          } else {
            res
              .status(404)
              .json({ success: false, message: "password incorrecta" });
          }
        });
      })
      .catch(function (err) {
        res
          .status(403)
          .json({ message: "No se encontro el usuario.", data: err });
      });
  });