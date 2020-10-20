const server = require('express').Router();
const { Reviews } = require('../db');

server.post("/:id/user/:idUser", function (req, res) {
    var { comentarios, puntaje } = req.body;
    Reviews.create(
      {
        comentarios: comentarios, 
        puntaje: puntaje,
        productId: req.params.id,
        userId: req.params.idUser
      }
    )
    .then(newReview => res.status(201).json({
		message: 'Nueva Review!',
		newReview
	}))
	.catch(error => res.status(400).json({
		message: 'No se creó la review',
		error: error
	}));
      });

module.exports = server;